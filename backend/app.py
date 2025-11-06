from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from config import DevelopmentConfig

# Extensions
db = SQLAlchemy()

def create_app(config_class=DevelopmentConfig):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize extensions
    db.init_app(app)
    CORS(app)

    # Register blueprints
    from routes.screen_time import screen_time_bp
    from routes.missions import missions_bp
    from routes.statistics import statistics_bp
    from routes.achievements import achievements_bp

    app.register_blueprint(screen_time_bp, url_prefix='/api/screen-time')
    app.register_blueprint(missions_bp, url_prefix='/api/missions')
    app.register_blueprint(statistics_bp, url_prefix='/api/statistics')
    app.register_blueprint(achievements_bp, url_prefix='/api/achievements')

    @app.route('/')
    def index():
        return {'message': '도파민 브레이커 API 서버입니다.', 'status': 'running'}

    @app.route('/health')
    def health():
        return {'status': 'healthy'}

    return app

if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        db.create_all()  # 데이터베이스 테이블 생성
    app.run(debug=True, host='0.0.0.0', port=5000)