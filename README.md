# About This Project

- [About This Project](#about-this-project)
  - [Tech Stack](#tech-stack)
  - [Checklist](#checklist)
  - [How To Use](#how-to-use)
  - [Schema Details](#schema-details)
    - [1. User](#1-user)
    - [2. Task](#2-task)
    - [3. Team](#3-team)
  - [Routes](#routes)
    - [1. /users](#1-users)
    - [2. /tasks](#2-tasks)
    - [3. /assign](#3-assign)
    - [4. /login, /register](#4-login-register)
  - [About Authorization](#about-authorization)
  - [About Security](#about-security)
  - [**API**](#api)
    - [1. Register](#1-register)
    - [2. Login](#2-login)
    - [3. User](#3-user)
      - [3.1 Show Users](#31-show-users)
      - [3.2 Show User by ID](#32-show-user-by-id)
      - [3.3 Create User without register](#33-create-user-without-register)
      - [3.4 Update User](#34-update-user)
      - [3.5 Delete User](#35-delete-user)
    - [4. Task](#4-task)
      - [4.1 Get Tasks](#41-get-tasks)
      - [4.2 Get Task by ID](#42-get-task-by-id)
      - [4.3 Create New Task](#43-create-new-task)
      - [4.4 Update Task](#44-update-task)
      - [4.5 Delete Task](#45-delete-task)
    - [5. Team](#5-team)
      - [5.1 Get Teams](#51-get-teams)
      - [5.2 Create Team](#52-create-team)
      - [5.3 Update Team](#53-update-team)
      - [5.4 Delete Team](#54-delete-team)
    - [6. Assign](#6-assign)
      - [6.1 Assign Task to Users](#61-assign-task-to-users)
      - [6.2 Assign User to Team](#62-assign-user-to-team)
      - [6.3 Assign Task to Team](#63-assign-task-to-team)

## Tech Stack
- Framework : Express.js
- Database : MongoDB
- Tools : Bcrypt + Json Web Token + hapi/joi

&nbsp;

## Checklist
- [x] Complete Minimum Requirements
- [x] Complete Optional Requirements
- [ ] Complete Documentation

&nbsp;

## How To Use

1. Download this repository
2. สร้างไฟล์ .env
จากนั้นใส่ข้อมูลตามนี้ เพื่อใช้ในการ connect กับ database และสร้าง token

```
DATABASE_URL = mongodb+srv://sgcu123:sgcu123@cluster0.bde09vg.mongodb.net/sgcutee
TOKEN_SECRET = qAdtXZ#%@zxcTBbasDdHqr
```

3. ติดตั้ง node.js, npm, postman (ใช้ในการยิง api)

4. Run code ด้วยคำสั่ง
```
npm run devstart
```

5. ใช้ URL localhost:3000
   
&nbsp;

## Schema Details
___ 
&nbsp;

### 1. User
```
email : เก็บ email [String]
password : เก็บ password ซึ่งจะเป็น password ที่ถูก hash ไว้แล้ว [String]
firstname, surname: เก็บชื่อและนามสกุล [String]
role: เก็บว่า user นี้เป็นตำแหน่งอะไร มี 2 ประเภทคือ user และ admin (ไว้ใช้ในเรื่อง authorization) [String]
salary: เก็บเงินเดือน [Number]
tasksList: เก็บ id ของ task ทั้งหมดที่ผู้ใช้รายนี้ต้องทำ โดยเก็บเฉพาะ task ที่ assign มาแบบ individual เท่านั้น (ไม่รวมของ team) [Array]
team: เก็บ id ของทีมที่ผู้ใช้รายนี้อยู่ [ObjectID]
```

### 2. Task
```
name: เก็บชื่อ task [String]
content: เก็บเนื้อหาของ task [String]
status: เก็บ status ของ task [String]
deadline: เก็บ deadline ของ task [Date]
usersList: เก็บ id ของ user ทุกคนที่ถูกมอบหมายให้ทำ task นี้แบบ individual [Array]
teamsList: เก็บ id ของ team ทุกทีมที่ถูกมอบหมายให้ทำ task นี้ [Array]
```

### 3. Team
```
name: เก็บชื่อทีม [String]
usersList: เก็บ id ของ user ทุกคนที่อยู่ในทีมนี้ [Array]
tasksList: เก็บ id ของ task ทุกชิ้นที่ถูกมอบหมายให้ทีมนี้ [Array]
```

&nbsp;


## Routes
___
### 1. /users
สำหรับการ Create/Read/Update/Delete Users

### 2. /tasks
สำหรับการ Create/Read/Update/Delete Tasks

### 3. /assign
สำหรับการมอบหมายงานให้ User/Team

### 4. /login, /register
สำหรับ login, register ตามลำดับ

&nbsp;

## About Authorization
___
ในการ Create/Read/Update/Delete ทั้งหมด จะต้อง Login ก่อน
โดยวิธีการยิง API จะต้องใส่ token ที่ได้จากการล็อกอินลงไปในหมวด Headers
โดยตั้งชื่อ key ว่า `auth-token` และใส่ value เป็น token

สำหรับ API ที่ต้องเป็น admin จะต้องใช้ token ที่ได้จาก user ที่ role เป็น admin เท่านั้น ถึงจะใช้งานได้

&nbsp;

## About Security
___
- password จะถูกทำการ hash ด้วย bscript ก่อนเก็บลงฐานข้อมูล
- email ที่สมัครจะถูกนำมา validate ก่อนว่าเป็น format ที่ถูกต้อง
- password ของ database และ secretkey จะถูกเก็บไว้ในไฟล์ .env ซึ่งจะไม่แสดงใน production แต่ในที่นี้จะนำมาใส่ในวิธีติดตั้งเพื่อใช้ในการ test เป็นกรณีพิเศษ
- มีการจำกัด permission ของบาง api ว่าต้องล็อกอินก่อน หรือต้องเป็น admin ค่อยใช้งานได้

&nbsp;

## **API**
&nbsp;

## 1. Register
___
สร้าง User ใหม่ตาม email, password ที่รับมา โดยจะมีการ validate email ก่อนว่าถูกต้องในฟอร์มของอีเมล และเช็คว่ายังไม่มี email นี้ในฐานข้อมูล ในส่วนของ password จะทำการ hash เพื่อความปลอดภัย

- URL: `/register`
- Method: `POST`
- Data Params: `email`, `password`
- Permissions: -
- Response: _id ของ user ที่สร้างขึ้นใหม่
- Example Response:
```
{
    "id": "62c098a8f9b6726f49f9cc9f"
}
```

&nbsp;

## 2. Login
___
Login ด้วย email และ password ซึ่งถ้าล็อกอินสำเร็จจะ return token ไว้ใช้ในการยิง api

- URL: `/login`
- Method: `POST`
- Data Params: `email`, `password`
- Permissions: -
- Response: `auth-token` ของ user ที่ล็อกอิน
- Example Response:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmMwNjZjNGU2YzM2ZGUzZGEzYWJkMDciLCJpYXQiOjE2NTY3ODg0MjZ9.qYj0xKiHgOBMxNf0SLDYCtYU0NoEBAh_hhr04iLbUhk
```

&nbsp;

## 3. User
___
&nbsp;

## 3.1 Show Users
___
return users ทั้งหมดที่มีใน database โดยสามารถ query ให้แสดงเฉพาะ ชื่อ, นามสกุล, ตำแหน่งที่กำหนดได้ โดยใส่เป็น json ใน body (ไม่จำเป็นต้องใส่ให้ครบทุก parameter)
**ในกรณีที่คนยิง api ไม่ใช่ admin จะแสดงผลเฉพาะข้อมูลของตัวเองเท่านั้น**

- URL: `/users`
- Method: `GET`
- Data Params: `firstname`, `surname`, `role`
- Permissions: Login
- Response: ข้อมูลของ users ทั้งหมดที่ตรงตามเงื่อนไข
- Example Response:
```
[
    {
        "_id": "62c066c4e6c36de3da3abd07",
        "email": "admin@gmail.com",
        "password": "$2a$10$k.KLprzEG20VDXw0le1vD.J/F.KDRn1N6lYredhpIQlpXPEPowwme",
        "role": "admin",
        "tasksList": [],
        "__v": 0
    },
    {
        "_id": "62c069a4976a38d6fbbfcc3c",
        "email": "user1@gmail.com",
        "password": "$2a$10$w7gNuLFkeKYJNayEBKmA6eFqNsZqKdPBlNKbxO1XX5ULKe73j4sf2",
        "role": "user",
        "tasksList": [],
        "__v": 0
    }
]
```


## 3.2 Show User by ID
___
return user ที่มี _id ตรงกับ req.params.id

- URL: `/users/:id`
- Method: `GET`
- URL Params: `id`
- Permissions: Login, Admin
- Example Response:
```
{
    "_id": "62c066c4e6c36de3da3abd07",
    "email": "admin@gmail.com",
    "password": "$2a$10$k.KLprzEG20VDXw0le1vD.J/F.KDRn1N6lYredhpIQlpXPEPowwme",
    "role": "admin",
    "tasksList": [],
    "__v": 0
}
```

## 3.3 Create User without register
___
สร้าง user ใหม่ตามข้อมูลที่กำหนด โดยจะ return ข้อมูลของ user ที่สร้างกับ token ของ user นั้น

- URL: `/users`
- Method: `POST`
- Data Params: `email`, `password`, `firstname`, `surname`, `role`, `salary`
- Permissions: Login, Admin
- Note: สามารถ register แล้ว PATCH แทนได้
- Example Response:
```
{
    "user": {
        "email": "user3@gmail.com",
        "password": "$2a$10$SNxzdR6HMzkXQjXnYtzkaeeZP9T30kCCoMoLi/IPtHzjkGGgoVO9.",
        "firstname": "man003",
        "role": "user",
        "tasksList": [],
        "_id": "62c0936bf9b6726f49f9cc8b",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmMwOTM2YmY5YjY3MjZmNDlmOWNjOGIiLCJpYXQiOjE2NTY3ODc4MTl9.F5hAnizbMHzG5Mdt9RHl_IZbQngCXtLZ91JCMjkS-G4"
}
```

## 3.4 Update User
___
เปลี่ยนแปลง email, firstname, surname, role, salary ของ user ที่ _id ตรงกับ req.params.id

- URL: `/users/:id`
- Method: `PATCH`
- URL Params: `id`
- Data Params: `email`, `firstname`, `surname`, `role`, `salary`
- Permissions: Login, Admin
- Response: ข้อมูลใหม่ของ user ที่ถูกอัพเดท
- Example Response:
```
{
    "_id": "62c0936bf9b6726f49f9cc8b",
    "email": "user33@gmail.com",
    "password": "$2a$10$iU9xgoU1bDoQtOQm7oJc4OY0paQ.0XdiBcsLAknBOMSYXCk7bgu3C",
    "firstname": "man0033",
    "role": "user",
    "tasksList": [],
    "__v": 0
}
```
## 3.5 Delete User
___
ลบ user ที่ _id ตรงกับ req.params.id

- URL: `/users/:id`
- Method: `DELETE`
- URL Params: `id`
- Data Params: -
- Permissions: Login, Admin
- Response: `user deleted`
- Example Response:
```
{
    "message": "user deleted"
}
```

&nbsp;

## 4. Task
___
&nbsp;

## 4.1 Get Tasks
___
return Tasks ทั้งหมดที่มีใน database ซึ่งสามารถ query ให้แสดงเฉพาะ ชื่อ, เนื้อหา, สถานะที่กำหนดได้

- URL: `/tasks`
- Method: `GET`
- Data Params: `name`, `content`, `status`
- Permissions: Login
- Response: รายการข้อมูลของ task ทั้งหมดที่ตรงตามเงื่อนไข
- Example Response:
```
[
    {
        "_id": "62c067d2c8fbc24038656e62",
        "name": "task1",
        "usersList": [],
        "teamsList": [],
        "__v": 0
    }
]
```

## 4.2 Get Task by ID
___
return Task ที่ _id ตรงกับ req.params.id

- URL: `/tasks/:id`
- Method: `GET`
- URL Params: `id`
- Data Params: -
- Permissions: Login
- Response: ข้อมูลของ task ที่ _id ตรงกับ id
- Example Response:
```
{
    "_id": "62c067d2c8fbc24038656e62",
    "name": "task1",
    "usersList": [],
    "teamsList": [],
    "__v": 0
}
```

## 4.3 Create New Task
___
สร้าง task ใหม่โดยมีชื่อ, เนื้อหา, สถานะ, วันหมดเขต ตามที่กำหนด

- URL: `/tasks`
- Method: `POST`
- URL Params: -
- Data Params: `name`, `content`, `status`, `deadline`
- Permissions: Login, Admin
- Response: ข้อมูลของ task ที่ถูกสร้าง
- Note: สำหรับการ assign task ให้กับ user จะอยู่ใน api assign
- Example Response:
```
{
    "_id": "62c067d2c8fbc24038656e62",
    "name": "task1",
    "usersList": [],
    "teamsList": [],
    "__v": 0
}
```

## 4.4 Update Task
___
อัพเดทข้อมูลของ task (ชื่อ, เนื้อหา, สถานะ, วันหมดเขต)

- URL: `/tasks/:id`
- Method: `PATCH`
- URL Params: `id`
- Data Params: `name`, `content`, `status`, `deadline`
- Permissions: Login, Admin
- Response: ข้อมูลของ task ที่ถูกอัพเดท
- Note: สำหรับการ assign task ให้กับ user จะอยู่ใน api assign
- Example Response:
```
{
    "_id": "62c067d2c8fbc24038656e62",
    "name": "task1",
    "usersList": [],
    "teamsList": [],
    "__v": 0,
    "content": "Hello World",
    "status": "In progress",
    "deadline": "2023-07-03T00:00:00.000Z"
}
```

## 4.5 Delete Task
___
ลบ task ที่มี _id ตรงกับ req.params.id

- URL: `/tasks/:id`
- Method: `DELETE`
- URL Params: `id`
- Data Params: -
- Permissions: Login, Admin
- Response: `Task deleted`
- Example Response:
```
{
    "message": "task deleted"
}
```

&nbsp;

## 5. Team
___
&nbsp;

## 5.1 Get Teams
___
ค้นหา team ทุกทีมที่อยู่ในฐานข้อมูล รวมถึงสามารถ query ชื่อ, id ที่ต้องการค้นหาได้

- URL: `/teams`
- Method: `GET`
- URL Params: -
- Data Params: `name`, `_id`
- Permissions: Login, Admin
- Response: รายการของทีมทั้งหมดที่ตรงเงื่อนไข
- Example Response:
```
[
    {
        "_id": "62c0a5cde4e2a2278411491a",
        "name": "team1",
        "usersList": [],
        "tasksList": [],
        "__v": 0
    },
    {
        "_id": "62c0a5d1e4e2a2278411491d",
        "name": "team2",
        "usersList": [],
        "tasksList": [],
        "__v": 0
    }
]
```

## 5.2 Create Team
___
สร้างทีมใหม่ขึ้นมา ตามข้อมูลที่กำหนด

- URL: `/teams`
- Method: `POST`
- URL Params: -
- Data Params: `name`
- Permissions: Login, Admin
- Response: ข้อมูลของทีมที่ถูกสร้างขึ้น
- Note: สำหรับการ assign user, task จะอยู่ใน api assign อีกที
- Example Response:
```
{
    "name": "team2",
    "usersList": [],
    "tasksList": [],
    "_id": "62c0a5f5e4e2a22784114924",
    "__v": 0
}
```

## 5.3 Update Team
___
อัพเดทชื่อของทีม

- URL: `/teams/:id`
- Method: `PATCH`
- URL Params: `id`
- Data Params: `name`
- Permissions: Login, Admin
- Response: ข้อมูลของทีมที่ถูกอัพเดท
- Note: สำหรับการ assign user, task จะอยู่ใน api assign อีกที
- Example Response:
```
{
    "_id": "62c0a5f5e4e2a22784114924",
    "name": "team22",
    "usersList": [],
    "tasksList": [],
    "__v": 0
}
```

## 5.4 Delete Team
___
ลบทีมที่ _id ตรงกับ req.params.id ออกจากฐานข้อมูล

- URL: `/teams/:id`
- Method: `DELETE`
- URL Params: `id`
- Data Params: -
- Permissions: Login, Admin
- Response: `team deleted`
- Example Response:
```
{
    "message": "team deleted"
}
```

&nbsp;

## 6. Assign
___
&nbsp;

## 6.1 Assign Task to Users
___
มอบหมาย task ที่มี _id ตรงกับ req.params.id ให้กับ user แบบ individual โดยที่สามารถมอบให้ทีละหลายคนในการยิง api ครั้งเดียวได้
หลังจากเรียกใช้เสร็จสิ้น tasksList ของ user และ usersList ของ task ที่เกี่ยวข้องจะมีการเปลี่ยนแปลง

- URL: `/assign/:id`
- Method: `POST`
- URL Params: `id`
- Data Params: `users`
- Permissions: Login, Admin
- Response: `Success`
- Note: `users` จะเป็น objectID อันเดียว หรือเป็น Array ของ objectID ก็ได้
- Example Response:
```
Success
```

## 6.2 Assign User to Team
___
เพิ่ม User ที่ _id ตรงกับที่กำหนด (req.body.userid) ลงไปใน Team ที่ _id ตรงกับที่กำหนด (req.body.teamid) โดยเมื่อเสร็จสิ้นแล้ว team, usersList ใน user, team ที่เกี่ยวข้องจะเปลี่ยนแปลง

- URL: `/assign/team/user`
- Method: `POST`
- URL Params: -
- Data Params: `userid`, `teamid`
- Permissions: Login, Admin
- Response: ข้อมูลของ user, team ที่ถูกอัพเดท
- Example Response:
```
{
    "user": {
        "_id": "62c069a4976a38d6fbbfcc3c",
        "email": "user1@gmail.com",
        "password": "$2a$10$w7gNuLFkeKYJNayEBKmA6eFqNsZqKdPBlNKbxO1XX5ULKe73j4sf2",
        "role": "user",
        "tasksList": [
            "62c067d2c8fbc24038656e62"
        ],
        "__v": 0,
        "team": "62c0a5d1e4e2a2278411491d"
    },
    "team": {
        "_id": "62c0a5d1e4e2a2278411491d",
        "name": "team2",
        "usersList": [
            "62c069a4976a38d6fbbfcc3c"
        ],
        "tasksList": [],
        "__v": 1
    }
}
```

## 6.3 Assign Task to Team
___
เพิ่ม Task ที่ _id ตรงกับที่กำหนด (req.body.taskid) ลงไปใน Team ที่ _id ตรงกับที่กำหนด (req.body.teamid) โดยเมื่อเสร็จสิ้นแล้ว teamsList, tasksList ใน task, team ที่เกี่ยวข้องจะเปลี่ยนแปลง

- URL: `/assign/team/task`
- Method: `POST`
- URL Params: -
- Data Params: `taskid`, `teamid`
- Permissions: Login, Admin
- Response: ข้อมูลของ task, team ที่ถูกอัพเดท
- Example Response:
```
{
    "task": {
        "_id": "62c067d2c8fbc24038656e62",
        "name": "task1",
        "usersList": [
            "62c066c4e6c36de3da3abd07",
            "62c069a4976a38d6fbbfcc3c"
        ],
        "teamsList": [
            "62c0a5d1e4e2a2278411491d"
        ],
        "__v": 1,
        "content": "Hello World",
        "deadline": "2023-07-03T00:00:00.000Z",
        "status": "In progress"
    },
    "team": {
        "_id": "62c0a5d1e4e2a2278411491d",
        "name": "team2",
        "usersList": [
            "62c069a4976a38d6fbbfcc3c"
        ],
        "tasksList": [
            "62c067d2c8fbc24038656e62"
        ],
        "__v": 2
    }
}
```

___ 

ธีธัช วิษณุโยธิน