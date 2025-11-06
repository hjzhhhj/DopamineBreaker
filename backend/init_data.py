"""
데이터베이스 초기 데이터 삽입 스크립트
"""
from app import create_app, db
from models.mission import Mission
from models.achievement import Achievement

def init_missions():
    """미션 초기 데이터"""
    missions = [
        Mission(
            title='스트레칭 타임',
            description='간단한 목과 어깨 스트레칭으로 긴장을 풀어보세요',
            duration=5,
            difficulty='easy',
            category='physical'
        ),
        Mission(
            title='심호흡 명상',
            description='깊은 호흡으로 마음을 안정시켜보세요',
            duration=10,
            difficulty='easy',
            category='mental'
        ),
        Mission(
            title='독서 시간',
            description='좋아하는 책을 읽으며 휴식을 취해보세요',
            duration=20,
            difficulty='medium',
            category='mental'
        ),
        Mission(
            title='산책하기',
            description='밖에 나가서 짧은 산책을 즐겨보세요',
            duration=15,
            difficulty='medium',
            category='physical'
        ),
        Mission(
            title='물 마시기',
            description='물 한 잔을 천천히 마시며 수분을 보충하세요',
            duration=3,
            difficulty='easy',
            category='health'
        ),
        Mission(
            title='요가 루틴',
            description='기본 요가 동작으로 몸과 마음을 정돈하세요',
            duration=30,
            difficulty='hard',
            category='physical'
        ),
    ]

    for mission in missions:
        existing = Mission.query.filter_by(title=mission.title).first()
        if not existing:
            db.session.add(mission)

    db.session.commit()
    print(f'{len(missions)}개의 미션이 추가되었습니다.')

def init_achievements():
    """업적 초기 데이터"""
    achievements = [
        Achievement(
            title='첫 걸음',
            description='첫 미션 완료',
            icon='🌱',
            requirement_type='mission_count',
            requirement_value=1
        ),
        Achievement(
            title='연속 3일',
            description='3일 연속 미션 수행',
            icon='🔥',
            requirement_type='streak_days',
            requirement_value=3
        ),
        Achievement(
            title='10개 달성',
            description='미션 10개 완료',
            icon='⭐',
            requirement_type='mission_count',
            requirement_value=10
        ),
        Achievement(
            title='한 달 챌린지',
            description='30일 연속 미션 수행',
            icon='🏆',
            requirement_type='streak_days',
            requirement_value=30
        ),
        Achievement(
            title='마스터',
            description='미션 100개 완료',
            icon='💎',
            requirement_type='mission_count',
            requirement_value=100
        ),
        Achievement(
            title='집중력 마스터',
            description='30분 이상 미션 20회',
            icon='🎯',
            requirement_type='long_mission_count',
            requirement_value=20
        ),
    ]

    for achievement in achievements:
        existing = Achievement.query.filter_by(title=achievement.title).first()
        if not existing:
            db.session.add(achievement)

    db.session.commit()
    print(f'{len(achievements)}개의 업적이 추가되었습니다.')

def main():
    """메인 함수"""
    app = create_app()

    with app.app_context():
        # 테이블 생성
        db.create_all()
        print('데이터베이스 테이블이 생성되었습니다.')

        # 초기 데이터 삽입
        init_missions()
        init_achievements()

        print('\n초기 데이터 삽입이 완료되었습니다!')

if __name__ == '__main__':
    main()