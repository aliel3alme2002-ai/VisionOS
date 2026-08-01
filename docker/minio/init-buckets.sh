#!/bin/sh
/usr/bin/mc alias set myminio http://minio:9000 ${MINIO_ROOT_USER} ${MINIO_ROOT_PASSWORD};
/usr/bin/mc mb myminio/visionos-recordings --ignore-existing;
/usr/bin/mc mb myminio/visionos-snapshots --ignore-existing;
/usr/bin/mc mb myminio/visionos-models --ignore-existing;
/usr/bin/mc mb myminio/visionos-avatars --ignore-existing;
/usr/bin/mc anonymous set download myminio/visionos-avatars;
exit 0;
