import { useState, useEffect } from 'react'
import styled from 'styled-components'

const ProfileContainer = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.lg};
  padding-bottom: 100px;
`

const ProfileHeader = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xl} 0;
  margin-bottom: ${props => props.theme.spacing.xl};
`

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin: 0 auto ${props => props.theme.spacing.md};
`

const UserName = styled.h1`
  font-size: ${props => props.theme.fontSizes.xxl};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.text};
`

const MedalSection = styled.section`
  margin-bottom: ${props => props.theme.spacing.xxl};
`

const SectionTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.semiBold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md};
`

const MedalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${props => props.theme.spacing.md};
`

const MedalCard = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  text-align: center;
`

const MedalIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: ${props => props.theme.spacing.sm};
`

const MedalCount = styled.div`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.medalColor};
  margin-bottom: ${props => props.theme.spacing.xs};
`

const MedalLabel = styled.div`
  font-size: ${props => props.theme.fontSizes.xs};
  color: ${props => props.theme.colors.textSecondary};
`

const RecentMissions = styled.section``

const MissionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`

const MissionItem = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.md};
  box-shadow: ${props => props.theme.shadows.sm};
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const MissionInfo = styled.div`
  flex: 1;
`

const MissionTitle = styled.div`
  font-size: ${props => props.theme.fontSizes.md};
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.xs};
`

const MissionDate = styled.div`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textSecondary};
`

const MissionBadge = styled.div`
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: ${props => props.tierColor}20;
  color: ${props => props.tierColor};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
`

const tierConfig = {
  bronze: { label: '브론즈', color: '#CD7F32', icon: '🥉' },
  silver: { label: '실버', color: '#C0C0C0', icon: '🥈' },
  gold: { label: '골드', color: '#FFD700', icon: '🥇' },
}

function Profile() {
  const [userName] = useState('사용자')
  const [medalStats, setMedalStats] = useState({
    bronze: 0,
    silver: 0,
    gold: 0
  })
  const [recentMissions, setRecentMissions] = useState([])

  useEffect(() => {
    // TODO: API에서 데이터 가져오기
    // 임시 데이터
    setMedalStats({
      bronze: 12,
      silver: 5,
      gold: 0
    })

    setRecentMissions([
      { id: 1, title: '스트레칭 타임', date: '2024-11-06', tier: 'bronze' },
      { id: 2, title: '심호흡 명상', date: '2024-11-06', tier: 'bronze' },
      { id: 3, title: '독서 시간', date: '2024-11-05', tier: 'silver' },
      { id: 4, title: '산책하기', date: '2024-11-05', tier: 'silver' },
      { id: 5, title: '물 마시기', date: '2024-11-04', tier: 'bronze' },
    ])
  }, [])

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${month}월 ${day}일`
  }

  return (
    <ProfileContainer>
      <ProfileHeader>
        <Avatar>👤</Avatar>
        <UserName>{userName}</UserName>
      </ProfileHeader>

      <MedalSection>
        <SectionTitle>획득한 메달</SectionTitle>
        <MedalGrid>
          {Object.entries(tierConfig).map(([tier, config]) => (
            <MedalCard key={tier}>
              <MedalIcon>{config.icon}</MedalIcon>
              <MedalCount medalColor={config.color}>
                {medalStats[tier]}개
              </MedalCount>
              <MedalLabel>{config.label} 메달 획득</MedalLabel>
            </MedalCard>
          ))}
        </MedalGrid>
      </MedalSection>

      <RecentMissions>
        <SectionTitle>최근 클리어한 미션</SectionTitle>
        <MissionList>
          {recentMissions.map(mission => (
            <MissionItem key={mission.id}>
              <MissionInfo>
                <MissionTitle>{mission.title}</MissionTitle>
                <MissionDate>{formatDate(mission.date)}</MissionDate>
              </MissionInfo>
              <MissionBadge tierColor={tierConfig[mission.tier].color}>
                {tierConfig[mission.tier].label}
              </MissionBadge>
            </MissionItem>
          ))}
        </MissionList>
      </RecentMissions>
    </ProfileContainer>
  )
}

export default Profile