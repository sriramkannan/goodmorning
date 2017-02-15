## Introduction

This is a small utility to construct and send "Start of Day" email. 
This tool can be used by SRE folks in an organization to send daily or on demand status/health of the entire company infrastructure by environments (Production/QA etc) and by type(Network/Databases/Services/Applications etc). 

The tool is built in Electron so it can be used as a desktop app. 


config.json has email_list as a variable. Please enter comma separated email ids within double-quotes to send email to the list. 

## Installation

After checkout, do "npm install". 
Start the app "electron ." within the root folder of the app. 

## Packaging

Install electron-packager - "npm install -g electron-packager"
see electron-packager -h for more instruction on how to package apps. It will create .exe for Windows and similar executable for various environments. 
After packaging, copy the template/ folder to the same folder where the .exe file resides.

## SMTP for email

By default the Office365 SMTP information is placed in the script/emailUtil.js
Please change SMTP information as per your company needs. 
