import { useState, useEffect } from 'react'
import styled from 'styled-components'
import AchievementCard from '../components/AchievementCard'

const RecordsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xl};
`

const PageTitle = styled.h1`
  font-size: ${props => props.theme.fontSizes.xxxl};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.text};
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.lg};
`

const StatCard = styled.div`
  background-color: ${props => props.theme.colors.surface};
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.md};
  text-align: center;
`

const StatValue = styled.div`
  font-size: ${props => props.theme.fontSizes.xxxl};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.sm};
`

const StatLabel = styled.div`
  font-size: ${props => props.theme.fontSizes.md};
  color: ${props => props.theme.colors.textSecondary};
`

const Section = styled.section`
  background-color: ${props => props.theme.colors.surface};
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.sm};
`

const SectionTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes.xxl};
  font-weight: ${props => props.theme.fontWeights.semiBold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg};
`

const RecordList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`

const RecordItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: ${props => props.theme.colors.background};
`

const RecordInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
`

const RecordTitle = styled.div`
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.text};
`

const RecordDate = styled.div`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textSecondary};
`

const RecordBadge = styled.div`
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: ${props => props.theme.colors.success};
  color: white;
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
`

function Records() {
  const [stats, setStats] = useState({
    totalMissions: 0,
    currentStreak: 0,
    longestStreak: 0,
    totalTime: 0
  })

  const [recentRecords, setRecentRecords] = useState([])

  useEffect(() => {
    // TODO: API에서 통계 및 기록 데이터 가져오기
    // 임시 데이터
    setStats({
      totalMissions: 47,
      currentStreak: 5,
      longestStreak: 12,
      totalTime: 385 // 분
    })

    setRecentRecords([
      { id: 1, title: '스트레칭 타임', date: '2024-11-06 14:30', duration: 5 },
      { id: 2, title: '심호흡 명상', date: '2024-11-06 11:20', duration: 10 },
      { id: 3, title: '독서 시간', date: '2024-11-05 16:45', duration: 20 },
      { id: 4, title: '산책하기', date: '2024-11-05 13:10', duration: 15 },
      { id: 5, title: '요가 루틴', date: '2024-11-04 18:00', duration: 30 },
    ])
  }, [])

  return (
    <RecordsContainer>
      <PageTitle>나의 기록</PageTitle>

      <StatsGrid>
        <StatCard>
          <StatValue>{stats.totalMissions}</StatValue>
          <StatLabel>완료한 미션</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.currentStreak}일</StatValue>
          <StatLabel>현재 연속 기록</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.longestStreak}일</StatValue>
          <StatLabel>최고 연속 기록</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{Math.floor(stats.totalTime / 60)}시간</StatValue>
          <StatLabel>총 디톡스 시간</StatLabel>
        </StatCard>
      </StatsGrid>

      <Section>
        <SectionTitle>최근 완료한 미션</SectionTitle>
        <RecordList>
          {recentRecords.map(record => (
            <RecordItem key={record.id}>
              <RecordInfo>
                <RecordTitle>{record.title}</RecordTitle>
                <RecordDate>{record.date}</RecordDate>
              </RecordInfo>
              <RecordBadge>{record.duration}분</RecordBadge>
            </RecordItem>
          ))}
        </RecordList>
      </Section>

      <Section>
        <SectionTitle>달성한 업적</SectionTitle>
        <AchievementCard />
      </Section>
    </RecordsContainer>
  )
}

export default Records