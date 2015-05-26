## Chitoge 千棘留言板

**English**  
A simple web message board with cookie-based authentication system. Users can post an article with a picture to the board.  
Developed for anniversary 100yr for Fudan University

**中文**  
一个简单的web留言板. 用户系统基于cookie. 用户可以把自己的文章和照片放到上面来.  
为复旦大学110周年校庆开发.



## Installation

**English**  

Python(3.4+, 2.7+)
Suggest use a virtualenv

> pip install requirements.txt  
> python manage.py makemigrations API  
> python manage.py migrate  
> python manage.py runserver 8000  

Go to http://localhost:8000/Anniversary110yr/Chitoge/


**中文**  
需要的python版本python2.7+, python3.4+

执行命令(建议在virtualenv下使用)

> pip install requirements.txt  
> python manage.py makemigrations API  
> python manage.py migrate  
> python manage.py runserver 8000  

打开浏览器, 进入http://localhost:8000/Anniversary110yr/Chitoge/




## API explanation
**English**

You can directly go to api url(etc. /Anniversary110yr/Chitoge/article/create) to   
get more details. DRF(django-rest-framework) provides this awesome way to test api.  
Enjoy it!

### create
> /Anniversary110yr/Chitoge/article/create/

introduction: create a article

##### method POST
multipart/form-data
```form
	name=string,
	year=string,
	content=string,
	image=binary,
```

[more detail about upload image](http://stackoverflow.com/questions/20473572/django-rest-framework-file-upload). hope this help :) 

### retrieve  
> /Anniversary110yr/Chitoge/article/list?offset=:offset  

introduction: return articles from offset to offset+20 order by descending created time

##### method: get

format(array)  

```json
[{ 
	'id': number, (primary key)  
	'name': str,   
	'year': str,   
	'content': str,   
	'image': str, (url)
	'created_at': str,
	'starCount': number
}, ...]
```

### star & unstar

> /Anniversary110yr/Chitoge/star/:id/  
> /Anniversary110yr/Chitoge/unstar/:id/  

introduction: star an article (duplicated stars are banned)

##### method: post


## LICENSE

The MIT License (MIT)

Copyright (c) 2015 

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

