FROM node:20-alpine
EXPOSE 3000
EXPOSE 3001
EXPOSE 3002

WORKDIR /home/app

COPY package.json /home/app/
COPY package-lock.json /home/app/
COPY scripts/.env /home/app/

COPY AccountService/build/ /home/app/AccountService/build/
COPY AccountService/package.json /home/app/AccountService/
COPY AccountService/package-lock.json /home/app/AccountService/
COPY AccountService/tsoa.json /home/app/AccountService/

COPY OrderService/build/ /home/app/OrderService/build/
COPY OrderService/package.json /home/app/OrderService/
COPY OrderService/package-lock.json /home/app/OrderService/
COPY OrderService/tsoa.json /home/app/OrderService/

COPY ProductService/build/ /home/app/ProductService/build/
COPY ProductService/package.json /home/app/ProductService/
COPY ProductService/package-lock.json /home/app/ProductService/
COPY ProductService/tsoa.json /home/app/ProductService/

COPY vendor-api/build/ /home/app/vendor-api/build/
COPY vendor-api/package.json /home/app/vendor-api/
COPY vendor-api/package-lock.json /home/app/vendor-api/
COPY vendor-api/tsoa.json /home/app/vendor-api/

COPY shopper-app/.next/ /home/app/shopper-app/.next/
COPY shopper-app/package.json /home/app/shopper-app/
COPY shopper-app/package-lock.json /home/app/shopper-app/
COPY shopper-app/next-i18next.config.js/ /home/app/shopper-app/
COPY shopper-app/next.config.js/ /home/app/shopper-app/
COPY shopper-app/public/ /home/app/shopper-app/public/

COPY admin-app/.next/ /home/app/admin-app/.next/
COPY admin-app/package.json /home/app/admin-app/
COPY admin-app/package-lock.json /home/app/admin-app/
COPY admin-app/next-i18next.config.js/ /home/app/admin-app/
COPY admin-app/next.config.js/ /home/app/admin-app/
COPY admin-app/public/ /home/app/admin-app/public/

COPY vendor-app/.next/ /home/app/vendor-app/.next/
COPY vendor-app/package.json /home/app/vendor-app/
COPY vendor-app/package-lock.json /home/app/vendor-app/
COPY vendor-app/next-i18next.config.js/ /home/app/vendor-app/
COPY vendor-app/next.config.js/ /home/app/vendor-app/
COPY vendor-app/public/ /home/app/vendor-app/public/

COPY e2e/e2e.js /home/app/e2e/
COPY e2e/package.json /home/app/e2e/
COPY e2e/package-lock.json /home/app/e2e/

RUN npm run cis

CMD npm run start