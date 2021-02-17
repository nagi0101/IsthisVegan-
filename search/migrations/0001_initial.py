# Generated by Django 3.1.6 on 2021-02-17 22:27

import ckeditor_uploader.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Ingredient',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=60)),
                ('category', models.CharField(choices=[('MEAT', '육류'), ('FISH', '어류'), ('EGG', '난류'), ('MILK', '우유'), ('ETC', '기타')], max_length=4)),
            ],
            options={
                'verbose_name': 'Ingredient',
                'verbose_name_plural': 'Ingredients',
            },
        ),
        migrations.CreateModel(
            name='TipOffPost',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('prdlstReportNo', models.PositiveIntegerField(default=0, verbose_name='상품번호')),
                ('content', ckeditor_uploader.fields.RichTextUploadingField(verbose_name='제보 내용')),
                ('is_checked', models.BooleanField(default=False, verbose_name='확인 여부')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
