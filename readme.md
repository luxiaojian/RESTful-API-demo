# 使用express,MongoDb快速构建Node.js REST API ([PPT](https://speakerdeck.com/luxiaojijan/nodejsshi-xian-restful-api))
## REST API解决了什么问题（能干什么？）
网络应用-重前端轻后端模式，后端专注于业务，提供前端数据接口。一套API给多客户端提供服务

### Resetful API-设计更加规范的API

RESTful(Representational State Transfer)-表现层状态转化

* 每一个URI代表一种资源。为所有“事物”定义ID

* 客户端和服务器之间，传递这种资源的某种表现层。

* 客户端通过四个HTTP动词（GET、POST、PUT、DELETE），对服务器端资源进行操作，实现"表现层状态转化"。
## 设计规范（怎么用？）
####1. 网址中不能有动词，只能有名词，所用的名词往往与数据库的表格名对应。
####2. 对于资源的具体操作类型，由HTTP动词表示。
	* GET: 从服务器取回一个资源
	* POST: 在服务器新建一个资源
	* PUT: 更新已经存在的资源(客户端提供改变后的完整资源)
	* PATCH:在服务器更新资源（客户端提供改变的属性）
	* DELETE: 删除一个服务器资源

	##### 简单设计的案例
	
	* GET /tickets 取回门票的列表
	* GET /tickets/:id 取回一个指定门票
	* POST /tickets 创建一张新的门票
	* PUT /tickets/12 更新一张指定门票的信息
	* PATCH /tickets/12 部分更新一张指定门票的信息
	* DELETE /tickets/12 删除一张指定门票的所有信息 

	
####3. 过滤(filtering)
	
网址后提供参数，如：

* /api/docs/?limit = 6 指定返回6个文档
* /api/docs/?limit = 6&order = asc 指定返回6个文档并按升序排序

####4. 行为(action)
	
当做子资源对待。例如:github上，对一个gists加星操作：PUT /gists/:id/star 并且取消星操作：DELETE /gists/:id/star.
### 可行性（能用在哪里）
####客户端浏览器方面：

由于历史原因,目前浏览器的<form>标签只支持GET和POST，但是通过ajax技术，几乎所有的主流浏览器都支持GET/POST/PUT/DELETE这4个方法，测试代码如下：

```js
$.ajax({url:'/rest',type:'put',success:function(data){

        alert("浏览器支持PUT:"+data);

}});

$.ajax({url:'/rest',type:'delete',success:function(data){

        alert("浏览器支持DELETE:"+data);

}});
```

####服务器端：

express的router模块实现了router.METHOD支持router.get,router.post,router.put,router.delete等方法。	
##使用express,MongoDb快速构建Node.js REST API
	
### express

#### express - nodejs的web框架
> 对nodejs的核心模块http进行封装，实现了app,router,response,request模块，提供可扩展的中间件机制

#### express 如何工作起来的
* 引入第三方模块
![屏幕快照 2015-09-29 上午7.30.33](media/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202015-09-29%20%E4%B8%8A%E5%8D%887.30.33.png)

* 配置express(如设置模板引擎，配置自身以及扩展的一些组件）

![屏幕快照 2015-09-29 上午7.37.02](media/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202015-09-29%20%E4%B8%8A%E5%8D%887.37.02.png)


* 连接数据库（mysql,mongodb,redis)

![屏幕快照 2015-09-29 上午7.37.56](media/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202015-09-29%20%E4%B8%8A%E5%8D%887.37.56.png)

* 定义中间件（错误处理，静态文件路径）

* 设置并引入路由

#### express的中间件机制
> http请求过程中对请求进行处理的函数。

一个http的处理过程就好比污水处理，express的中间件就好比一层层的过滤网。

### MongoDb
>文档式Nosql数据库

#### shell命令介绍
```shell
* mongod: 启动MongoDb数据库
* mongo: 进入控制条
* show dbs: 显示数据库列表;
* use db_name: 切换数据库;
* db.dropDatabase(): 删除当前使用的数据库;
* show tables/collections: 显示数据库中所有的表;
* db.collection_name.find(query):对某一个表进行查找;
* db.collection_name.findOne(query):找出一条满足条件记录;
* db.collection_name.insert(document):插入一条记录;
* db.collection_name.save(document):保存一条记录;
* db.collection_name.update(query,{$set:data}):更新一条记录;
* db.collection_name.remove(query):插入一条记录;
* printjson(document)
```
#### 资料

[MongoDB在mongo控制台下的基本使用命令](http://www.itokit.com/2012/0417/73611.html)
#### ORM(Mongoose,squelize)
> 将数据库抽象成原生语言可操作对象操作的方法

### MVC架构

![屏幕快照 2015-09-29 上午10.32.32](media/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202015-09-29%20%E4%B8%8A%E5%8D%8810.32.32.png)

#### 1. controller: 控制业务逻辑，连接数据和视图之间的关系。
#### 2. Model: 数据层，定义数据模型骨架Schema(不具备数据库的操作能力)，由Schema生成模型Model(具有抽象属性和行为的数据库操作)
#### 3. Service: 服务层，把对数据库操作封装成具体服务。
#### 4. View: 通过模板引擎把数据渲染成页面

工作流程: 每个请求进来，首先进入controller,controller调用service里面的操作拼装数据，然后发给前端。
### 文档网站实例
#### 设计表

1. colleges(学院)

	```json
  name: String,
  picture: String,
  meta:{
    createAt:{
      type: Date,
      default: Date.now()
    },
    updateAt:{
      type: Date,
      default: Date.now()
    }
  }
	```
2. courses(课程）
 
 ```json
  name: String,
  type: String,
  college: ObjectId,
  picture: String,
  download: Number,
  meta:{
    createAt:{
      type: Date,
      default: Date.now()
    },
    updateAt:{
      type: Date,
      default: Date.now()
    }
  }
 ```
 
3. docs(文档）

 ```json
  name: String,
  fileType: String,
  course: ObjectId,
  courseType: String,
  college: ObjectId,
  link: String,
  download: Number,
  meta:{
    createAt:{
      type: Date,
      default: Date.now()
    },
    updateAt:{
      type: Date,
      default: Date.now()
    }
  }
 ```
4. users(用户)

 ```json
 name: String,
  email: String,
  password: String,
  meta:{
    createAt:{
      type: Date,
      default: Date.now()
    },
    updateAt:{
      type: Date,
      default: Date.now()
    }
  }
 ```
 
 #### 设计api文档
 ![屏幕快照 2015-09-29 上午11.14.31](media/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202015-09-29%20%E4%B8%8A%E5%8D%8811.14.31.png)

#### 代码实现
  
### 资料
* [http-api-design](https://github.com/interagent/http-api-design)-[中文翻译](https://kcyeu.gitbooks.io/http-api-design-guide-tc/content/)
* [Best Practices for Designing a Pragmatic RESTful API](http://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api)-[中文翻译](http://blog.jobbole.com/41233/)
* [Restful架构及其技术可行性](http://yuankeqiang.lofter.com/post/8de51_10792a5)
* [理解RESTful架构](http://www.ruanyifeng.com/blog/2011/09/restful.html)
* [RESTful API 设计指南](http://www.ruanyifeng.com/blog/2014/05/restful_api.html)



