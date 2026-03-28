from flask import Flask
from config import Config
from middleware.auth import load_current_user
from models import db
from routes.auth import auth_bp

def create_app():
    app = Flask(__name__)

    #load config and connect to db, register auth blueprint
    app.config.from_object(Config)
    db.init_app(app)
    app.before_request(load_current_user)
    app.register_blueprint(auth_bp)

    #test route
    @app.route("/")
    def home():
        return {"message": "Backend is running"}

    return app

#run app if being called directly
app = create_app()
if __name__ == "__main__":
    app.run(debug=True)