// CloudFront Function (viewer-request, cloudfront-js-2.0) - egeuzun.me-block-ai-bots
// AI egitim tarayicilari robots.txt disinda hicbir seye erisemez;
// AI arama/asistan botlari ve bilinen kaziyicilar CV'ye erisemez.
// robots.txt ile ayni listeyi tutar; birini degistirirsen digerini de guncelle.

var TRAINING = /gptbot|claudebot|anthropic-ai|ccbot|bytespider|meta-externalagent|facebookbot|amazonbot|cohere-ai|cohere-training|diffbot|omgili|webzio|ai2bot|timpibot|pangubot|deepseekbot|qwenbot|kimibot|googleother|imagesiftbot|reflectionbot/;

// "iPhone OS 13_2_3" gercek bir tarayici degil, CV'yi en cok ceken kaziyicinin sabit UA'si.
var CV_BLOCKED = /oai-searchbot|chatgpt-user|claude-searchbot|claude-user|perplexity|meta-externalfetcher|duckassistbot|mistralai-user|youbot|iphone os 13_2_3/;

function handler(event) {
    var request = event.request;
    if (request.uri === '/robots.txt') {
        return request;
    }

    var header = request.headers['user-agent'];
    var ua = header ? header.value.toLowerCase() : '';
    if (TRAINING.test(ua) || (request.uri === '/assets/cv.pdf' && CV_BLOCKED.test(ua))) {
        return {
            statusCode: 403,
            statusDescription: 'Forbidden',
            headers: { 'cache-control': { value: 'no-store' } }
        };
    }

    return request;
}
