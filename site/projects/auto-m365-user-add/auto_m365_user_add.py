import os
import json
import msal
import requests


CLIENT_ID = os.getenv('CLIENT_ID')
CLIENT_SECRET = os.getenv('CLIENT_SECRET')
TENANT_ID = os.getenv('TENANT_ID')

if not all([CLIENT_ID, CLIENT_SECRET, TENANT_ID]):
    raise SystemExit("Set CLIENT_ID, CLIENT_SECRET, TENANT_ID environment variables")

AUTHORITY = f"https://login.microsoftonline.com/{TENANT_ID}"
SCOPE = ["https://graph.microsoft.com/.default"]
GRAPH_API_ENDPOINT = 'https://graph.microsoft.com/v1.0'

app = msal.ConfidentialClientApplication(
    CLIENT_ID, authority=AUTHORITY, client_credential=CLIENT_SECRET
)


def get_access_token() -> str:
    result = app.acquire_token_for_client(scopes=SCOPE)
    if 'access_token' in result:
        return result['access_token']
    raise RuntimeError(f"Could not acquire access token: {result}")


def create_user(user_data: dict) -> dict:
    token = get_access_token()
    headers = { 'Authorization': f'Bearer {token}', 'Content-Type': 'application/json' }
    resp = requests.post(f'{GRAPH_API_ENDPOINT}/users', headers=headers, json=user_data)
    if not resp.ok:
        raise RuntimeError(f"User create failed: {resp.status_code} {resp.text}")
    return resp.json()


def assign_license(user_id: str, license_data: dict) -> dict:
    token = get_access_token()
    headers = { 'Authorization': f'Bearer {token}', 'Content-Type': 'application/json' }
    resp = requests.post(f'{GRAPH_API_ENDPOINT}/users/{user_id}/assignLicense', headers=headers, json=license_data)
    if not resp.ok:
        raise RuntimeError(f"Assign license failed: {resp.status_code} {resp.text}")
    return resp.json()


def main():
    # Example payloads — replace before running
    new_user = {
        "accountEnabled": True,
        "displayName": "ege uzun",
        "mailNickname": "egeeee",
        "userPrincipalName": "ege@yourdomain.com",
        "passwordProfile": {
            "forceChangePasswordNextSignIn": True,
            "password": "your_password"
        }
    }

    license_data = {
        "addLicenses": [ { "skuId": "your_sku_id" } ],
        "removeLicenses": []
    }

    created_user = create_user(new_user)
    print(json.dumps(created_user, indent=2))

    user_id = created_user.get('id')
    if user_id:
        assigned_license = assign_license(user_id, license_data)
        print(json.dumps(assigned_license, indent=2))
    else:
        print("User ID not found; license assignment skipped")


if __name__ == '__main__':
    main()

