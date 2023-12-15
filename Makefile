install:
	pnpm install

build-super-admin-staging:
	pnpm run build --filter super-admin

# aws s3 sync apps/super-admin/dist s3://brook-staging --profile vsquare-services
# --path "/*" --profile vsquare-services
publish-brook-su-admin-dashboard-staging:
	aws s3 sync apps/super-admin/dist s3://brook-staging
	aws cloudfront create-invalidation \
	--distribution-id E3TP32Z83PK8KW \
	--path "/*"

publish-brook-su-admin-staging:
	${MAKE} install
	${MAKE} build-super-admin-staging
	${MAKE} publish-brook-su-admin-dashboard-staging

############## 
#### PROD ####
############## 

build-prod:
	pnpm run build-prod --filter super-admin

publish-brook-su-admin-dashboard-prod:

publish-all-production:
	${MAKE} install
	${MAKE} build-prod
	${MAKE} publish-brook-su-admin-dashboard-prod

run-su:
	pnpm dev --filter super-admin

run-admin:
	pnpm dev --filter admin

run-web:
	pnpm dev --filter web

