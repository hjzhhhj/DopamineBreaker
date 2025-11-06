import styled from 'styled-components'

const Card = styled.div`
  background-color: ${props => props.theme.colors.surface};
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  transition: all ${props => props.theme.transitions.fast};
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`

const MissionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: ${props => props.theme.spacing.md};
`

const MissionTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.semiBold};
  color: ${props => props.theme.colors.text};
`

const DifficultyBadge = styled.span`
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: ${props => props.theme.fontWeights.medium};
  background-color: ${props => {
    switch (props.difficulty) {
      case 'easy': return props.theme.colors.success
      case 'medium': return props.theme.colors.warning
      case 'hard': return props.theme.colors.error
      default: return props.theme.colors.info
    }
  }};
  color: white;
`

const MissionDescription = styled.p`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.5;
  margin-bottom: ${props => props.theme.spacing.lg};
`

const MissionFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Duration = styled.div`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.primary};
`

const StartButton = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: ${props => props.theme.fontWeights.medium};
  transition: all ${props => props.theme.transitions.fast};

  &:hover {
    background-color: #5a52d5;
  }
`

const difficultyLabels = {
  easy: '쉬움',
  medium: '보통',
  hard: '어려움'
}

function MissionCard({ mission, onStart }) {
  return (
    <Card onClick={onStart}>
      <MissionHeader>
        <MissionTitle>{mission.title}</MissionTitle>
        <DifficultyBadge difficulty={mission.difficulty}>
          {difficultyLabels[mission.difficulty]}
        </DifficultyBadge>
      </MissionHeader>

      <MissionDescription>{mission.description}</MissionDescription>

      <MissionFooter>
        <Duration>{mission.duration}분</Duration>
        <StartButton onClick={(e) => {
          e.stopPropagation()
          onStart()
        }}>
          시작하기
        </StartButton>
      </MissionFooter>
    </Card>
  )
}

export default MissionCard