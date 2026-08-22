@echo off
cd /d D:\TL
node scripts\translate_oracle.cjs interpretations --lang=en 1>> D:\TL\logs\en_output.log 2>>&1
