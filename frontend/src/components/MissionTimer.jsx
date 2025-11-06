import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

const TimerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: ${props => props.theme.spacing.xxl};
`

const MissionTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes.xxxl};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.text};
  text-align: center;
`

const TimerDisplay = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, #5a52d5 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${props => props.theme.shadows.xl};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    width: 280px;
    height: 280px;
    border-radius: 50%;
    background-color: ${props => props.theme.colors.surface};
  }
`

const Time = styled.div`
  font-size: 4rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.text};
  z-index: 1;
  font-variant-numeric: tabular-nums;
`

const MissionDescription = styled.p`
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.textSecondary};
  text-align: center;
  max-width: 500px;
  line-height: 1.6;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.lg};
`

const Button = styled.button`
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xxl};
  border-radius: ${props => props.theme.borderRadius.lg};
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.semiBold};
  transition: all ${props => props.theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`

const CancelButton = styled(Button)`
  background-color: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.text};
  border: 2px solid ${props => props.theme.colors.border};

  &:hover {
    border-color: ${props => props.theme.colors.textSecondary};
  }
`

const CompleteButton = styled(Button)`
  background-color: ${props => props.theme.colors.success};
  color: white;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`

const FocusAlert = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${props => props.theme.colors.surface};
  padding: ${props => props.theme.spacing.xxl};
  border-radius: ${props => props.theme.borderRadius.xl};
  box-shadow: ${props => props.theme.shadows.xl};
  text-align: center;
  z-index: 1000;
  display: ${props => props.show ? 'block' : 'none'};

  h3 {
    font-size: ${props => props.theme.fontSizes.xxl};
    color: ${props => props.theme.colors.primary};
    margin-bottom: ${props => props.theme.spacing.md};
  }

  p {
    font-size: ${props => props.theme.fontSizes.lg};
    color: ${props => props.theme.colors.textSecondary};
  }
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: ${props => props.show ? 'block' : 'none'};
`

function MissionTimer({ mission, onComplete, onCancel }) {
  const [timeLeft, setTimeLeft] = useState(mission.duration * 60) // 초 단위로 변환
  const [isCompleted, setIsCompleted] = useState(false)
  const [showFocusAlert, setShowFocusAlert] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    // 타이머 시작
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          setIsCompleted(true)
          // 브라우저 알림
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('미션 완료!', {
              body: `${mission.title} 미션을 완료했습니다!`,
              icon: '/icon.png'
            })
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // 알림 권한 요청
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }

    // 페이지 이탈 감지
    const handleVisibilityChange = () => {
      if (document.hidden && !isCompleted) {
        setShowFocusAlert(true)
        setTimeout(() => setShowFocusAlert(false), 3000)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      clearInterval(intervalRef.current)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [mission.title, isCompleted])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleComplete = () => {
    clearInterval(intervalRef.current)
    onComplete()
  }

  const handleCancel = () => {
    clearInterval(intervalRef.current)
    onCancel()
  }

  return (
    <>
      <TimerContainer>
        <MissionTitle>{mission.title}</MissionTitle>

        <TimerDisplay>
          <Time>{formatTime(timeLeft)}</Time>
        </TimerDisplay>

        <MissionDescription>{mission.description}</MissionDescription>

        <ButtonGroup>
          <CancelButton onClick={handleCancel}>취소</CancelButton>
          <CompleteButton onClick={handleComplete} disabled={!isCompleted}>
            {isCompleted ? '완료하기' : '진행 중...'}
          </CompleteButton>
        </ButtonGroup>
      </TimerContainer>

      <Overlay show={showFocusAlert} />
      <FocusAlert show={showFocusAlert}>
        <h3>집중 모드 중입니다!</h3>
        <p>앱으로 다시 돌아와주세요</p>
      </FocusAlert>
    </>
  )
}

export default MissionTimer