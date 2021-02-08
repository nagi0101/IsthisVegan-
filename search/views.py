import requests
import json
from django.shortcuts import render
from django.http import JsonResponse
from .models import Ingredient

# Create your views here.


def search_main(request):
    return render(request, "search/search.html")


def search_btn_clicked(request):
    if request.method == "POST":
        data = json.loads(request.body)
        print(data)
        search_input = data["searchInput"]
        print(search_input)
        return_type = "json"
        num_of_rows = 100

        request_url = f"http://apis.data.go.kr/B553748/CertImgListService/getCertImgListService?serviceKey=Hqj4w64Wo7xSvrx3EQQGTKsuqFJh8CQCf%2BoiFAZ%2BAH9fvW0fTJkTXfP2D8pliwEE0x2Fv8o%2BjvVqHVEYa65Qwg%3D%3D&prdlstNm={search_input}&returnType={return_type}&pageNo=1&numOfRows={num_of_rows}"

        response = requests.get(request_url)
        content = json.loads(response.content)
        return JsonResponse(content, safe=False)


def search_detail_filter(request):
    if request.method == "POST":
        data = json.loads(request.body)
        ingredient_text = data["ingredientText"]
        print(ingredient_text)
        ingredientDB = list(Ingredient.objects.all())

        veganFilter = {}

        for category in Ingredient.CATEGORY_SELECT:
            veganFilter[category[0]] = False

        for ingredient in ingredientDB:
            if ingredient.name in ingredient_text:
                veganFilter[ingredient.category] = True

        print(veganFilter)

        return JsonResponse(veganFilter)