import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const HomeContainer = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.lg};
  padding-bottom: 100px;
`

const Header = styled.div`
  margin-bottom: ${props => props.theme.spacing.xl};
`

const Greeting = styled.h1`
  font-size: ${props => props.theme.fontSizes.xxl};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm};
  line-height: 1.4;
`

const DateText = styled.p`
  font-size: ${props => props.theme.fontSizes.md};
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing.md};
`

const Section = styled.section`
  margin-bottom: ${props => props.theme.spacing.xxl};
`

const SectionTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.semiBold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md};
`

const UsageCard = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.md};
`

const TotalTime = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.lg} 0;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  margin-bottom: ${props => props.theme.spacing.lg};
`

const TimeValue = styled.div`
  font-size: 3rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.xs};
`

const TimeLabel = styled.div`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textSecondary};
`

const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`

const CategoryItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`

const CategoryIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.theme.fontSizes.lg};
  flex-shrink: 0;
`

const CategoryInfo = styled.div`
  flex: 1;
`

const CategoryName = styled.div`
  font-size: ${props => props.theme.fontSizes.md};
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.xs};
`

const CategoryTime = styled.div`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textSecondary};
`

const MissionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${props => props.theme.spacing.md};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`

const MissionCardSmall = styled.div`
  background: ${props => props.gradient};
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.lg};
  color: white;
  cursor: pointer;
  transition: transform ${props => props.theme.transitions.fast};

  &:hover {
    transform: translateY(-4px);
  }
`

const MissionTitle = styled.div`
  font-size: ${props => props.theme.fontSizes.md};
  font-weight: ${props => props.theme.fontWeights.semiBold};
  margin-bottom: ${props => props.theme.spacing.xs};
`

const MissionDuration = styled.div`
  font-size: ${props => props.theme.fontSizes.sm};
  opacity: 0.9;
`

function Home() {
  const navigate = useNavigate()
  const [userName] = useState('사용자')
  const [currentDate, setCurrentDate] = useState('')
  const [usageData, setUsageData] = useState({
    total: 0,
    categories: []
  })

  useEffect(() => {
    // 현재 날짜 설정
    const date = new Date()
    const month = date.getMonth() + 1
    const day = date.getDate()
    setCurrentDate(`${month}월 ${day}일`)

    // TODO: API에서 사용 기록 가져오기
    // 임시 데이터
    setUsageData({
      total: 342, // 분
      categories: [
        { name: '엔터테인먼트', time: 150, color: '#0B84FF', icon: '🎬' },
        { name: '생산성 및 금융', time: 85, color: '#6AC4DC', icon: '💼' },
        { name: '소셜 미디어', time: 107, color: '#FF9F0B', icon: '💬' },
      ]
    })
  }, [])

  const quickMissions = [
    { id: 1, title: '스트레칭', duration: '5분', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { id: 2, title: '심호흡', duration: '10분', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    { id: 3, title: '산책', duration: '15분', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
    { id: 4, title: '독서', duration: '20분', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
  ]

  const handleMissionClick = () => {
    navigate('/mission')
  }

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}시간 ${mins}분` : `${mins}분`
  }

  return (
    <HomeContainer>
      <Header>
        <Greeting>{userName}님<br />잠시 쉬어가볼까요?</Greeting>
        <DateText>{currentDate} 사용기록</DateText>
      </Header>

      <Section>
        <UsageCard>
          <TotalTime>
            <TimeValue>{formatTime(usageData.total)}</TimeValue>
            <TimeLabel>오늘 총 사용시간</TimeLabel>
          </TotalTime>

          <CategoryList>
            {usageData.categories.map((category, index) => (
              <CategoryItem key={index}>
                <CategoryIcon color={category.color}>
                  {category.icon}
                </CategoryIcon>
                <CategoryInfo>
                  <CategoryName>{category.name}</CategoryName>
                  <CategoryTime>{formatTime(category.time)}</CategoryTime>
                </CategoryInfo>
              </CategoryItem>
            ))}
          </CategoryList>
        </UsageCard>
      </Section>

      <Section>
        <SectionTitle>오늘의 미션</SectionTitle>
        <MissionGrid>
          {quickMissions.map(mission => (
            <MissionCardSmall
              key={mission.id}
              gradient={mission.gradient}
              onClick={handleMissionClick}
            >
              <MissionTitle>{mission.title}</MissionTitle>
              <MissionDuration>{mission.duration}</MissionDuration>
            </MissionCardSmall>
          ))}
        </MissionGrid>
      </Section>
    </HomeContainer>
  )
}

export default Home