#!/bin/bash

# Set folder
src=$(pwd)
be_folder="Exp_Sitemap_Node_BE"
# be_folder="TF_EAppr_BE"

# Get datetime
date=$(date +"%Y%m%d%H%M%S")

# ------------------------- GIT PUSH ON ANGULAR FE -------------------------
cd "$src" || exit
git switch master && \
git add . && \
git status && \
git commit -m "DEPLOY SEQUENCE - $date" && \
git push origin master

# ------------------------- GIT PUSH ON NODE BE -------------------------
ng build && \
cp -r "$src/dist/mapping_ng_fe/browser/" "$src/../$be_folder/web" && \
cd "$src/../$be_folder" || exit
git switch master && \
git add . && \
git status && \
git commit -m "DEPLOY SEQUENCE - $date" && \
git push origin master
