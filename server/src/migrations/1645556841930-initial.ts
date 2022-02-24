import { DEFAULT_USER_IMAGE, FOOD_IMAGE1, FOOD_IMAGE10, FOOD_IMAGE11, FOOD_IMAGE12, FOOD_IMAGE13, FOOD_IMAGE14, FOOD_IMAGE15, FOOD_IMAGE2, FOOD_IMAGE3, FOOD_IMAGE4, FOOD_IMAGE5, FOOD_IMAGE6, FOOD_IMAGE7, FOOD_IMAGE8, FOOD_IMAGE9, IMAGE1, IMAGE2, IMAGE3, IMAGE4, IMAGE5, LOGO1, LOGO2, LOGO3, LOGO4, LOGO5 } from "../image-constants";
import {MigrationInterface, QueryRunner} from "typeorm";
import argon2 from "argon2";


export class initial1645554639886 implements MigrationInterface {
    name = 'initial1645554639886'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create tables in database
        await queryRunner.query(`CREATE TABLE "tag" ("id" SERIAL NOT NULL, "tagName" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_334b5e2238470c6f0f124e60ccd" UNIQUE ("tagName"), CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "merchant_tag" ("merchantId" integer NOT NULL, "tagId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_23f9a80f70146fb6db48cbe5a13" PRIMARY KEY ("merchantId", "tagId"))`);
        await queryRunner.query(`CREATE TABLE "order_item" ("orderId" integer NOT NULL, "foodItemId" integer NOT NULL, "quantity" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1f2050a1b81fae2de451f0ab648" PRIMARY KEY ("orderId", "foodItemId"))`);
        await queryRunner.query(`CREATE TABLE "review" ("userId" integer NOT NULL, "merchantId" integer NOT NULL, "comment" character varying NOT NULL, "rating" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f2b31b4a5a7c3696897ee3209dd" PRIMARY KEY ("userId", "merchantId"))`);
        await queryRunner.query(`CREATE TABLE "video" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "videoUrl" character varying NOT NULL, "tokens" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1a2f3856250765d72e7e1636c8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_video" ("userId" integer NOT NULL, "videoId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3bdd7e2a08c85e754c450b2322c" PRIMARY KEY ("userId", "videoId"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "income" integer, "dependents" integer, "dob" TIMESTAMP, "country" character varying, "gender" character varying, "phoneNumber" character varying, "maxTokens" integer, "currentTokens" integer, "imageUrl" character varying, "imageAlt" character varying, "latitude" double precision, "longitude" double precision, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "merchantId" integer NOT NULL, "cost" integer, "isComplete" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "merchant" ("id" SERIAL NOT NULL, "cpname" character varying NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "cplogo" character varying, "imageUrl" character varying, "imageAlt" character varying, "latitude" double precision, "longitude" double precision, "address1" character varying, "address2" character varying, "city" character varying, "postcode" character varying, "country" character varying, "reviewCount" integer NOT NULL DEFAULT 0, "averageRating" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_9e10a7ac91601d8d795cee96536" UNIQUE ("cpname"), CONSTRAINT "UQ_0369e7853b1a4d8e366c7b3b796" UNIQUE ("username"), CONSTRAINT "UQ_546608b3c7bf7c175d3780c38f8" UNIQUE ("email"), CONSTRAINT "PK_9a3850e0537d869734fc9bff5d6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "food_item" ("id" SERIAL NOT NULL, "itemName" character varying NOT NULL, "imageUrl" character varying, "imageAlt" character varying, "cost" double precision NOT NULL, "description" character varying NOT NULL, "stock" integer NOT NULL, "merchantId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_057940b0225785ec693de562cf4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "merchant_tag" ADD CONSTRAINT "FK_9997965241231f065d2a26e3650" FOREIGN KEY ("merchantId") REFERENCES "merchant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "merchant_tag" ADD CONSTRAINT "FK_51712f68dc9e7dd002b531da23a" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_779432332ca27702001c830fa3f" FOREIGN KEY ("foodItemId") REFERENCES "food_item"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_1337f93918c70837d3cea105d39" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_f37df7003658cdfef3ccce3f8f1" FOREIGN KEY ("merchantId") REFERENCES "merchant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_video" ADD CONSTRAINT "FK_45168e8fb0a2f45871a5a8ec04e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_video" ADD CONSTRAINT "FK_4680aeb44958b4d5b9e7f6a9b7b" FOREIGN KEY ("videoId") REFERENCES "video"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_293ad75db4c3b2aa62996c75ad1" FOREIGN KEY ("merchantId") REFERENCES "merchant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "food_item" ADD CONSTRAINT "FK_7ab9e2d9e3cf122e2b60bedf773" FOREIGN KEY ("merchantId") REFERENCES "merchant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    
        // // Insert users
        await queryRunner.query(`
            insert into "user" (firstname, lastname, username, email, password, income, dependents, dob, country, gender, "phoneNumber", "maxTokens", "currentTokens", "imageAlt", latitude, longitude, "imageUrl") 
            values ('Suhas', 'Arun', 'suhas', 'suhas@ijs.com', '${await argon2.hash("suhas1")}', 20000, 2, '2003-02-14', 'United Kingdom', 'Male', '020 7589 5111', 60, 60, 'suhas', 51.0142, -0.1943, '${DEFAULT_USER_IMAGE}');

            insert into "user" (firstname, lastname, username, email, password, income, dependents, dob, country, gender, "phoneNumber", "maxTokens", "currentTokens", "imageAlt", latitude, longitude, "imageUrl") 
            values ('Mus', 'Al Quraishi', 'mus', 'mus@ijs.com', '${await argon2.hash("mus123")}', 25000, 1, '2000-01-01', 'United Kingdom', 'Male', '020 7589 5111', 50, 50, 'mus', 52.4121, 0.1943, '${DEFAULT_USER_IMAGE}'); 

            
            insert into "user" (firstname, lastname, username, email, password, income, dependents, dob, country, gender, "phoneNumber", "maxTokens", "currentTokens", "imageAlt", latitude, longitude, "imageUrl") 
            values ('Oliwia', 'Ogrodniczek', 'oliwia', 'oliwia@ijs.com', '${await argon2.hash("oliwia")}', 15000, 4, '1998-05-19', 'United Kingdom', 'Female', '020 7589 5111', 140, 140, 'oliwia', 50.0342, 0.2049, '${DEFAULT_USER_IMAGE}');
        `);
 

        // Insert videos
        await queryRunner.query(`
            insert into "video" (title, "videoUrl", tokens) values ('Learn Python', 'https://www.youtube.com/embed/I2wURDqiXdM', 5);
            insert into "video" (title, "videoUrl", tokens) values ('How to Manage Your Money', 'https://www.youtube.com/watch?v=HQzoZfc3GwQ', 5);
            insert into "video" (title, "videoUrl", tokens) values ('Gordon''s Quick & Simple Recipes | Gordon Ramsay', 'https://www.youtube.com/watch?v=mhDJNfV7hjk', 5);
        `);

        // Insert tags
        await queryRunner.query(`
            insert into "tag" ("tagName") values ('Halal');
            insert into "tag" ("tagName") values ('Vegetarian');
            insert into "tag" ("tagName") values ('American');
            insert into "tag" ("tagName") values ('Italian');
            insert into "tag" ("tagName") values ('French');
            insert into "tag" ("tagName") values ('European');
            insert into "tag" ("tagName") values ('Middle Eastern');
            insert into "tag" ("tagName") values ('Fast Food');
            insert into "tag" ("tagName") values ('Indian');
            insert into "tag" ("tagName") values ('Jazz');
            insert into "tag" ("tagName") values ('Diner');
        `);

        // Insert merchants
        await queryRunner.query(`
            insert into "merchant" (cpname, username, email, password, cplogo, "imageUrl", "imageAlt", latitude, longitude, address1, address2, city, postcode, country)
            values ('Island Grill', 'islandgrill', 'islandgrill@gmail.com', '${await argon2.hash("islandgrill")}', '${LOGO1}', '${IMAGE1}', 'Island Grill', 51.5203, -0.1745, '32 Spring Street', 'Paddington', 'London', 'W2 4XY', 'United Kingdom');
        
            insert into "merchant" (cpname, username, email, password, cplogo, "imageUrl", "imageAlt", latitude, longitude, address1, address2, city, postcode, country)
            values ('Green Curry', 'greencurry', 'greencurry@gmail.com', '${await argon2.hash("greencurry")}', '${LOGO2}', '${IMAGE2}', 'Green Curry', 52.4854, -1.8234, '18 High Street', 'Small Heath', 'Birmingham', 'B9 4DL', 'United Kingdom');
        
            insert into "merchant" (cpname, username, email, password, cplogo, "imageUrl", "imageAlt", latitude, longitude, address1, address2, city, postcode, country)
            values ('Sweet Escape', 'sweetescape', 'sweetescape@gmail.com', '${await argon2.hash("sweetescape")}', '${LOGO3}', '${IMAGE3}', 'Sweet Escape', 51.5325, -0.02353, '74 Oxford Street', 'Mayfair', 'London', 'W1 0FX', 'United Kingdom');
        
            insert into "merchant" (cpname, username, email, password, cplogo, "imageUrl", "imageAlt", latitude, longitude, address1, address2, city, postcode, country)
            values ('Bangalore Spices', 'bangalorespices', 'bangalorespices@gmail.com', '${await argon2.hash("bangalorespices")}', '${LOGO4}', '${IMAGE4}', 'Bangalore Spices',51.7523, -1.235, '18 High Street', '', 'Oxford', 'OX1 3DA', 'United Kingdom');
        
            insert into "merchant" (cpname, username, email, password, cplogo, "imageUrl", "imageAlt", latitude, longitude, address1, address2, city, postcode, country)
            values ('El Pirata Porch', 'elpirataporch', 'elpirataporch@gmail.com', '${await argon2.hash("elpirataporch")}', '${LOGO5}', '${IMAGE5}', 'El Pirata Porch', 53.2342, -2.3245, '27 Graham Road', 'Trafford', 'Manchester', 'M14 6GK', 'United Kingdom');
        `);

        // Insert food items
        await queryRunner.query(`
            insert into "food_item" ("itemName", "imageUrl", "imageAlt", cost, description, stock, "merchantId")
            values ('Cheeseburger', '${FOOD_IMAGE1}', 'Cheeseburger', 8, 'Delicious hamburger with cheese.', 100, 1);
            
            insert into "food_item" ("itemName", "imageUrl", "imageAlt", cost, description, stock, "merchantId")
            values ('Doner Kebab', '${FOOD_IMAGE2}', 'Doner Kebab', 9, 'Doner kebab served with rice.', 100, 1);
        
            insert into "food_item" ("itemName", "imageUrl", "imageAlt", cost, description, stock, "merchantId")
            values ('Halloumi Wrap', '${FOOD_IMAGE3}', 'Halloumi Wrap', 7, 'Grilled wrap containing halloumi cheese.', 100, 1);
        
            insert into "food_item" ("itemName", "imageUrl", "imageAlt", cost, description, stock, "merchantId")
            values ('Prawn Crackers', '${FOOD_IMAGE4}', 'Prawn Crackers', 3, 'Prawn crackers served with sweet chilli sauce.', 100, 2);
            
            insert into "food_item" ("itemName", "imageUrl", "imageAlt", cost, description, stock, "merchantId")
            values ('Thai Green Curry', '${FOOD_IMAGE5}', 'Thai Green Curry', 9, 'Our signature Green Curry.', 100, 2);
            
            insert into "food_item" ("itemName", "imageUrl", "imageAlt", cost, description, stock, "merchantId")
            values ('Pad Thai', '${FOOD_IMAGE6}', 'Pad Thai', 10, 'Stir-fried noodles with scrambled eggs and vegetables.', 100, 2);

            insert into "food_item" ("itemName", "imageUrl", "imageAlt", cost, description, stock, "merchantId")
            values ('Chocolate Cake', '${FOOD_IMAGE7}', 'Chocolate Cake', 5, 'Homemade chocolate cake.', 100, 3);

            insert into "food_item" ("itemName", "imageUrl", "imageAlt", cost, description, stock, "merchantId")
            values ('Waffles', '${FOOD_IMAGE8}', 'Waffles', 4, 'Waffles served with butter and chocolate syrup.', 100, 3);
        
            insert into "food_item" ("itemName", "imageUrl", "imageAlt", cost, description, stock, "merchantId")
            values ('Strawberry Milkshake', '${FOOD_IMAGE9}', 'Strawberry Milkshake', 3, 'Large strawberry milkshake.', 100, 3);
        
            insert into "food_item" ("itemName", "imageUrl", "imageAlt", cost, description, stock, "merchantId")
            values ('Poppadoms', '${FOOD_IMAGE10}', 'Poppadoms', 2, 'Poppadoms served with mango chutney.', 100, 4);

            insert into "food_item" ("itemName", "imageUrl", "imageAlt", cost, description, stock, "merchantId")
            values ('Vegetable Korma', '${FOOD_IMAGE11}', 'Vegetable Korma', 6, 'Vegetable korma (mild).', 100, 4);
        
            insert into "food_item" ("itemName", "imageUrl", "imageAlt", cost, description, stock, "merchantId")
            values ('Butter Naan', '${FOOD_IMAGE12}', 'Butter Naan', 3, 'Naan bread with butter.', 100, 4);
        
            insert into "food_item" ("itemName", "imageUrl", "imageAlt", cost, description, stock, "merchantId")
            values ('Nachos', '${FOOD_IMAGE13}', 'Nachos', 6, 'Nachos loaded with cheese.', 100, 5);
        
            insert into "food_item" ("itemName", "imageUrl", "imageAlt", cost, description, stock, "merchantId")
            values ('Chicken Quesadilla', '${FOOD_IMAGE14}', 'Chicken Quesadilla', 5, 'Grilled chicken and cheese wrapped in a tortilla.', 100, 5);
        
            insert into "food_item" ("itemName", "imageUrl", "imageAlt", cost, description, stock, "merchantId")
            values ('Beefy Burrito', '${FOOD_IMAGE15}', 'Beefy Burrito', 4, 'Seasoned beef and nacho cheese inside a grilled tortilla.', 100, 5);
        `)

        // Insert reviews
        await queryRunner.query(`
            insert into "review" ("userId", "merchantId", "comment", "rating")
            values (1, 1, 'Delicious food and fast service.', 5);
        
            insert into "review" ("userId", "merchantId", "comment", "rating")
            values (3, 1, 'The burger was average.', 3);

            insert into "review" ("userId", "merchantId", "comment", "rating")
            values (2, 2, 'Best Thai food I''ve ever had.', 5);

            insert into "review" ("userId", "merchantId", "comment", "rating")
            values (3, 2, 'Fantastic food.', 4);

            insert into "review" ("userId", "merchantId", "comment", "rating")
            values (1, 3, 'Great food but slow delivery', 3);

            insert into "review" ("userId", "merchantId", "comment", "rating")
            values (3, 3, 'The chocolate cake was incredible.', 5);

            insert into "review" ("userId", "merchantId", "comment", "rating")
            values (1, 4, 'Very good food.', 4);

            insert into "review" ("userId", "merchantId", "comment", "rating")
            values (2, 4, 'Top quality dinner.', 5);

            insert into "review" ("userId", "merchantId", "comment", "rating")
            values (2, 5, 'The food was cold when it arrived. Not happy.', 2);

            insert into "review" ("userId", "merchantId", "comment", "rating")
            values (3, 5, 'The beefy burrito was top notch.', 4);
        `);

        // Insert merchant tags
        await queryRunner.query(`
            insert into "merchant_tag" ("merchantId", "tagId")
            values (1, 3);
        
            insert into "merchant_tag" ("merchantId", "tagId")
            values (1, 11);

            insert into "merchant_tag" ("merchantId", "tagId")
            values (2, 1);

            insert into "merchant_tag" ("merchantId", "tagId")
            values (2, 11);

            insert into "merchant_tag" ("merchantId", "tagId")
            values (3, 2);

            insert into "merchant_tag" ("merchantId", "tagId")
            values (3, 3);

            insert into "merchant_tag" ("merchantId", "tagId")
            values (4, 2);

            insert into "merchant_tag" ("merchantId", "tagId")
            values (4, 9);

            insert into "merchant_tag" ("merchantId", "tagId")
            values (4, 11);

            insert into "merchant_tag" ("merchantId", "tagId")
            values (5, 8);
        `);


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "food_item" DROP CONSTRAINT "FK_7ab9e2d9e3cf122e2b60bedf773"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_293ad75db4c3b2aa62996c75ad1"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`);
        await queryRunner.query(`ALTER TABLE "user_video" DROP CONSTRAINT "FK_4680aeb44958b4d5b9e7f6a9b7b"`);
        await queryRunner.query(`ALTER TABLE "user_video" DROP CONSTRAINT "FK_45168e8fb0a2f45871a5a8ec04e"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_f37df7003658cdfef3ccce3f8f1"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_1337f93918c70837d3cea105d39"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_779432332ca27702001c830fa3f"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0"`);
        await queryRunner.query(`ALTER TABLE "merchant_tag" DROP CONSTRAINT "FK_51712f68dc9e7dd002b531da23a"`);
        await queryRunner.query(`ALTER TABLE "merchant_tag" DROP CONSTRAINT "FK_9997965241231f065d2a26e3650"`);
        await queryRunner.query(`DROP TABLE "food_item"`);
        await queryRunner.query(`DROP TABLE "merchant"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "user_video"`);
        await queryRunner.query(`DROP TABLE "video"`);
        await queryRunner.query(`DROP TABLE "review"`);
        await queryRunner.query(`DROP TABLE "order_item"`);
        await queryRunner.query(`DROP TABLE "merchant_tag"`);
        await queryRunner.query(`DROP TABLE "tag"`);
    }

}
