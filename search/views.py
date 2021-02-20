import requests
import json
from django.shortcuts import render, redirect
from django.http import JsonResponse
from .models import Ingredient
from .forms import TipOffPostForm


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

        # DB에 저장된 Ingredient를 모두 불러온다.
        ingredientDB = list(Ingredient.objects.all())

        # Ingredient 모델의 모든 카테고리를 저장하는 list이다.
        category_list = []
        # 해당 식품에 어떤 카테고리에 속하는 동물성 식재료들이
        # 포함되어 있는지를 저장하는 딕셔너리이다.
        vegan_filter = {}
        # 위의 카테고리에 속한 ingredient의 이름들을
        # category별로 저장할 딕셔너리이다.
        ingredient_name = {}

        # 딕셔너리의 내용(category)들을 생성한다.
        # category[0]은 DB에 저장된 category들의 이름이다.
        for category in Ingredient.CATEGORY_SELECT:
            vegan_filter[category[0]] = False
            ingredient_name[category[0]] = []
            category_list.append(category[0])

        for ingredient in ingredientDB:
            ingredientIndex = ingredient_text.find(ingredient.name)
            # 어떤 ingredient가 ingredient_text 안에 존재한다면
            if ingredientIndex != -1:
                # 해당 category의 ingredient가 있음을 저장한다.
                vegan_filter[ingredient.category] = True
                print(ingredient.category, ingredient.name)
                # 해당 ingredient의 이름을 저장한다.
                ingredient_name[ingredient.category].append(ingredient.name)

        ctx = {
            "vegan_filter": vegan_filter,
            "ingredient_name": ingredient_name,
            "category_list": category_list,
        }

        print(ctx)

        return JsonResponse(ctx)

def tip_off(request):
    if request.method == "POST":
        prdlstReportNo = request.POST['prdlstReportNo']
        form = TipOffPostForm()
        ctx = {
            'form': form,
            'prdlstReportNo': prdlstReportNo,
        }
        return render(request, 'search/tipoff_create.html', ctx)

def tip_off_create(request):
    #TODO Badge 기능 추가 시 로그인한 유저에 한해 경험치 부여

    if request.method == "POST":
        if len(request.POST['content']) == 0:
            return render(request, 'search/tipoff_create.html', {'alert_flag': True})

        form = TipOffPostForm(request.POST)

        if form.is_valid():
            post = form.save(commit=False)
            post.prdlstReportNo = request.POST["prdlstReportNo"]
            post.save()

        return redirect(f"/")

    else:
        form = TipOffPostForm()
        ctx = {
                "form": form,
        }
        return render(request, "search/tipoff_create.html", ctx) 