# -*- coding: utf-8 -*-
# Flask などの必要なライブラリをインポートする
from flask import Flask, render_template, request, redirect, url_for
import json

# 自身の名称を app という名前でインスタンス化する
app = Flask(__name__)

# ここからウェブアプリケーション用のルーティングを記述
# index にアクセスしたときの処理
@app.route('/')
def index():
    title = "将棋盤 pic_to_kif Thank you!"
    f = open("sample.txt",encoding='utf-8')
    message = ''.join(f.readlines())
    f.close()
    # index.html をレンダリングする
    return render_template('index.html',message=message)

if __name__ == '__main__':
    # app.debug = True # デバッグモード有効化
    app.run(debug=True) # どこからでもアクセス可能に