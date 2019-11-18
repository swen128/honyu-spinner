#!/bin/bash

for size in 16 32 48 128
do
  sips -z ${size} ${size} resources/icon.png --out src/images/icon${size}.png
done
