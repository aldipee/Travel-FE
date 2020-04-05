import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAgentProfile } from '../../redux/actions/AgentsActions'

import AgentProfile from '../../components/AgentProfile'

function Profile(props) {
  useEffect(() => {
    props.getAgentProfile()
  }, [])
  return (
    <div>
      <AgentProfile
        avatar={props.data && props.data.logo}
        fullName={props.data && props.data.name}
      />
    </div>
  )
}

Profile.propTypes = {}

const mapStateToProps = (state) => ({
  data: state.agentsData.singleData
})

const mapDispatchToProps = { getAgentProfile }

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
