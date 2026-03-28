from flask import g, request

from utils.auth_helpers import getUserFromRequest


def loadCurrentUser():
    #default to no logged in user
    g.current_user = None

    #skip auth lookup for preflight requests
    if request.method == "OPTIONS":
        return

    #attach user to flask global if token is valid
    g.current_user = getUserFromRequest()
