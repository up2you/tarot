@echo off
cd /d D:\TL
node scripts\translate_oracle.cjs interpretations --lang=ja 1>> logs\ja_output.log 2>>&1
