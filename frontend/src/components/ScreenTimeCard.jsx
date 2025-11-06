import styled from 'styled-components'

const Card = styled.div`
  background-color: ${props => props.theme.colors.surface};
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.md};
`

const CardTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.semiBold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg};
`

const TotalTime = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
`

const TimeValue = styled.div`
  font-size: ${props => props.theme.fontSizes.xxxl};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.primary};
`

const TimeLabel = styled.div`
  font-size: ${props => props.theme.fontSizes.md};
  color: ${props => props.theme.colors.textSecondary};
  margin-top: ${props => props.theme.spacing.sm};
`

const AppList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`

const AppItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: ${props => props.theme.colors.background};
`

const AppInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
`

const AppName = styled.div`
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.text};
`

const AppCategory = styled.div`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textSecondary};
`

const AppTime = styled.div`
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.semiBold};
  color: ${props => props.theme.colors.primary};
`

const categoryLabels = {
  social: '소셜',
  entertainment: '엔터테인먼트',
  productivity: '생산성',
  health: '건강'
}

function ScreenTimeCard({ data }) {
  const hours = Math.floor(data.total / 60)
  const minutes = data.total % 60

  return (
    <Card>
      <CardTitle>오늘의 스크린타임</CardTitle>
      <TotalTime>
        <TimeValue>
          {hours > 0 ? `${hours}시간 ` : ''}{minutes}분
        </TimeValue>
        <TimeLabel>총 사용 시간</TimeLabel>
      </TotalTime>
      <AppList>
        {data.apps.map((app, index) => (
          <AppItem key={index}>
            <AppInfo>
              <AppName>{app.name}</AppName>
              <AppCategory>{categoryLabels[app.category] || app.category}</AppCategory>
            </AppInfo>
            <AppTime>{app.time}분</AppTime>
          </AppItem>
        ))}
      </AppList>
    </Card>
  )
}

export default ScreenTimeCard