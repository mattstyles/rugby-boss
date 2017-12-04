
import styled from 'styled-components'
import {CSSTransition} from 'react-transition-group'

import {Text} from './type'
import {ButtonGroup, GroupButton} from './buttongroup'
import {Icon} from './icon'
import {getTheme, getColor} from './theme/helpers'

const TaskbarButton = GroupButton.extend`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
  line-height: normal;

  i {
    margin: auto;
  }

  :hover span {
    text-shadow: none;
    color: ${getColor('primary')};
  }
`
const TaskbarText = Text.extend`
  font-size: ${getTheme('type.size.vsmall')}rem;
  font-weight: 500;
  transition: color ease-out ${getTheme('transition.main')}ms;
  margin: auto 0;
  display: block;
`

const StyledBar = styled.div`
  width: 100%;
  height: auto;
  padding: 0;
`

const renderTasks = tasks => tasks
  .map(({
    id,
    icon,
    text,
    action
  }) => (
    <TaskbarButton
      key={id || icon || text}
      onClick={action}
    >
      {icon && <Icon
        icon={icon}
        size={2.1}
      />}
      {text && <TaskbarText>{text}</TaskbarText>}
    </TaskbarButton>
  ))

export const Taskbar = ({
  className,
  tasks,
  children
}) => (
  <StyledBar className={className}>
    <CSSTransition
      timeout={1000}
      classNames='fade'
    >
      <ButtonGroup>
        {children || renderTasks(tasks)}
      </ButtonGroup>
    </CSSTransition>
  </StyledBar>
)
