import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const StatisticsContainer = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.lg};
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xl};
`

const PageTitle = styled.h1`
  font-size: ${props => props.theme.fontSizes.xxl};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md};
`

const ChartSection = styled.section`
  background-color: ${props => props.theme.colors.surface};
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.sm};
`

const SectionTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.semiBold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md};
`

const ChartWrapper = styled.div`
  width: 100%;
  height: 300px;
`

const COLORS = ['#6C63FF', '#4CAF50', '#FF6B6B', '#FFC107', '#2196F3']

function Statistics() {
  const [weeklyData, setWeeklyData] = useState([])
  const [appUsageData, setAppUsageData] = useState([])

  useEffect(() => {
    // TODO: API에서 통계 데이터 가져오기
    // 임시 데이터
    setWeeklyData([
      { day: '월', screenTime: 320, detoxTime: 45 },
      { day: '화', screenTime: 285, detoxTime: 60 },
      { day: '수', screenTime: 310, detoxTime: 40 },
      { day: '목', screenTime: 265, detoxTime: 75 },
      { day: '금', screenTime: 290, detoxTime: 55 },
      { day: '토', screenTime: 340, detoxTime: 30 },
      { day: '일', screenTime: 310, detoxTime: 50 },
    ])

    setAppUsageData([
      { name: 'YouTube', value: 120 },
      { name: 'Instagram', value: 85 },
      { name: 'KakaoTalk', value: 65 },
      { name: 'Safari', value: 42 },
      { name: 'Netflix', value: 30 },
    ])
  }, [])

  return (
    <StatisticsContainer>
      <PageTitle>통계</PageTitle>

      <ChartSection>
        <SectionTitle>주간 사용 추이</SectionTitle>
        <ChartWrapper>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="screenTime" stroke="#FF6B6B" name="스크린타임 (분)" strokeWidth={2} />
              <Line type="monotone" dataKey="detoxTime" stroke="#4CAF50" name="디톡스 시간 (분)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartWrapper>
      </ChartSection>

      <ChartSection>
        <SectionTitle>앱별 사용 시간 (오늘)</SectionTitle>
        <ChartWrapper>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={appUsageData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {appUsageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartWrapper>
      </ChartSection>
    </StatisticsContainer>
  )
}

export default Statistics