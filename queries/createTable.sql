create table  employees (
	    id serial PRIMARY KEY,
	    name varchar(200) NOT NUll  ,
        email varchar(200) NOT NUll unique ,
        password varchar(200) NOT NUll ,
        experience INT NOT NUll ,
        gender INT NOT NUll,
        date_of_birth Date NOT NULL,
        location varchar(200) NOT NUll ,
        current_annual_salary INT NOT NUll ,
        expected_annual_salary INT NOT NUll ,
        notice_period INT NOT NUll,
        img_name varchar(200) NOT NUll ,
        industry INT NOT NUll,
        resume_name varchar(200) NOT NUll ,
        qualification varchar(200) NOT NUll ,
        skills text[] NOT NULL
);