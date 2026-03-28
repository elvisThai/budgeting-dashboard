from flask import Flask
from config import Config
from middleware.auth import loadCurrentUser
from models import db
from routes.auth import auth_bp

def createApp():
    app = Flask(__name__)

    #load config and set up database/auth
    app.config.from_object(Config)
    db.init_app(app)
    app.before_request(loadCurrentUser)
    app.register_blueprint(auth_bp, url_prefix="/auth")

    #basic test route
    @app.route("/")
    def home():
        return {"message": "Backend is running"}

    return app

#run app directly for local development
app = createApp()
if __name__ == "__main__":
    app.run(debug=True)
