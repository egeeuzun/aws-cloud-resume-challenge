import os
import json
import boto3

# DynamoDB client/table setup with environment variables for flexibility
dynamodb = boto3.resource("dynamodb")
TABLE_NAME = os.environ.get("TABLE_NAME", "cloud-resume-counter")
PRIMARY_KEY = os.environ.get("PRIMARY_KEY", "id")
ITEM_ID = os.environ.get("ITEM_ID", "1")
COUNT_ATTR = os.environ.get("COUNT_ATTR", "views")  # stored attribute name in the table

table = dynamodb.Table(TABLE_NAME)


def _cors_headers():
    allowed_origin = os.environ.get("ALLOWED_ORIGIN", "*")
    return {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": allowed_origin,
        "Access-Control-Allow-Methods": "GET,OPTIONS",
        "Access-Control-Allow-Headers": "content-type",
    }


def _response(status_code: int, body: dict):
    return {
        "statusCode": status_code,
        "headers": _cors_headers(),
        "body": json.dumps(body),
    }


def lambda_handler(event, context):
    # Support both API Gateway (REST/HTTP v2) and Lambda Function URL events
    method = (
        (event.get("requestContext", {}).get("http", {}) or {}).get("method")
        or event.get("httpMethod")
        or "GET"
    ).upper()

    if method == "OPTIONS":
        # Preflight
        return {
            "statusCode": 204,
            "headers": _cors_headers(),
        }

    try:
        # Atomically increment the counter and return the new value
        update = table.update_item(
            Key={PRIMARY_KEY: ITEM_ID},
            UpdateExpression="ADD #c :one",
            ExpressionAttributeNames={"#c": COUNT_ATTR},
            ExpressionAttributeValues={":one": 1},
            ReturnValues="UPDATED_NEW",
        )
        new_val = int(update.get("Attributes", {}).get(COUNT_ATTR, 0))
        # The frontend expects { count: number }
        return _response(200, {"count": new_val})
    except Exception as e:
        # Best-effort read to return something meaningful
        print("Error updating counter:", repr(e))
        try:
            item = table.get_item(Key={PRIMARY_KEY: ITEM_ID}).get("Item", {})
            current = int(item.get(COUNT_ATTR, 0))
        except Exception:
            current = 0
        return _response(500, {"count": current, "error": "internal_error"})
