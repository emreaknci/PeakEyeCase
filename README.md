# PeakEye Case

This project was developed for PeakEye's Full Stack Developer case.

## Run Locally

You can follow the steps below to run the project on your local machine.

```bash
   git clone https://github.com/emreaknci/PeakEyeCase.git

   cd PeakEyeCase

   docker-compose -p peakeye up -d
```

## Sign In as Admin

Seed data has been added to enable login as an administrator.


```http
  POST /auth/sign-in
```
Request Body:


```
 {
   "email":"admin@admin.com",
   "password":"123456"
 }
```

