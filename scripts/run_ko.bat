@echo off
cd /d D:\TL
node scripts\translate_oracle.cjs interpretations --lang=ko 1>> logs\ko_output.log 2>>&1
