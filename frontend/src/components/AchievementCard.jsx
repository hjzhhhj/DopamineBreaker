import styled from 'styled-components'

const AchievementGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: ${props => props.theme.spacing.lg};
`

const Badge = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.lg};
  background-color: ${props => props.unlocked ? props.theme.colors.background : '#f5f5f5'};
  opacity: ${props => props.unlocked ? 1 : 0.4};
  transition: all ${props => props.theme.transitions.fast};

  &:hover {
    transform: ${props => props.unlocked ? 'translateY(-4px)' : 'none'};
  }
`

const BadgeIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${props => props.unlocked
    ? `linear-gradient(135deg, ${props.theme.colors.primary} 0%, ${props.theme.colors.secondary} 100%)`
    : '#ddd'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.theme.fontSizes.xxxl};
  margin-bottom: ${props => props.theme.spacing.md};
`

const BadgeTitle = styled.div`
  font-weight: ${props => props.theme.fontWeights.semiBold};
  color: ${props => props.theme.colors.text};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xs};
`

const BadgeDescription = styled.div`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textSecondary};
  text-align: center;
`

const achievements = [
  {
    id: 1,
    icon: '🌱',
    title: '첫 걸음',
    description: '첫 미션 완료',
    unlocked: true
  },
  {
    id: 2,
    icon: '🔥',
    title: '연속 3일',
    description: '3일 연속 미션 수행',
    unlocked: true
  },
  {
    id: 3,
    icon: '⭐',
    title: '10개 달성',
    description: '미션 10개 완료',
    unlocked: true
  },
  {
    id: 4,
    icon: '🏆',
    title: '한 달 챌린지',
    description: '30일 연속 미션 수행',
    unlocked: false
  },
  {
    id: 5,
    icon: '💎',
    title: '마스터',
    description: '미션 100개 완료',
    unlocked: false
  },
  {
    id: 6,
    icon: '🎯',
    title: '집중력 마스터',
    description: '30분 이상 미션 20회',
    unlocked: false
  },
]

function AchievementCard() {
  return (
    <AchievementGrid>
      {achievements.map(achievement => (
        <Badge key={achievement.id} unlocked={achievement.unlocked}>
          <BadgeIcon unlocked={achievement.unlocked}>
            {achievement.icon}
          </BadgeIcon>
          <BadgeTitle>{achievement.title}</BadgeTitle>
          <BadgeDescription>{achievement.description}</BadgeDescription>
        </Badge>
      ))}
    </AchievementGrid>
  )
}

export default AchievementCard