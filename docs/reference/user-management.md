# User management

## Intro

## SMTP

configured _only_ in env vars

### Basic config

### Options from common providers

SendGrid

(https://docs.mattermost.com/configure/smtp-email.html as example)

## Gotchas

- owner should make a regular member account as can't differentiate who owns which workflow

## notes from call

- user management on/off with env var (double check w. David). Removes everything in UI
- by default when UM isn't setup, users redirected to a setup flow which they can skip

features: login, user password reset, owner + member (1 owner - does setup, adds removes users. Can't transfer ownership. can see everyone's work) (members same as now just with personal settings to change password, and cannot delete tags)