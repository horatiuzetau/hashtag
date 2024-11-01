import styled from '@emotion/styled';
import { CircularProgress, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { fetchActivities } from '../../../api';
import { getFromMap } from '../../../utils/MapUtils';
import Activity from './Activity';

export default function ActivityList({ date, availabilityMap, handleOnActivityPress }) {
    const [activities, setActivities] = useState([])
    const [loading, setLoading] = useState(false)
    // const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        getActivities();
    }, [])

    // Get activities from backend
    const getActivities = () => {
        fetchActivities()
            .then(data => {
                // setError(null)
                setLoading(false)
                setActivities(data.data)
            })
            .catch(err => {
                // setError(err)
                setLoading(false)
            });
    }

    // Filter activities based on availabilityMap
    let activitiesToDisplay = activities.filter(activity => {
        if (!getFromMap(availabilityMap, activity.id)) {
            return false;
        }
        let dateMap = getFromMap(availabilityMap, activity.id, date);
        return dateMap && dateMap.size > 0;
    });

    // Render 
    const getStepBodyContent = () => {
        // Show loading if loading
        if (loading) {
            return (
                <div className='center'>
                    <CircularProgress />
                </div>
            )
        }

        // Show no activities, if no activities are in the list
        if (!activitiesToDisplay.length === 0) {
            return (
                <StyledNoActivitiesMessageBox>
                    Nu exista activitati disponibile pentru data selectata. Selectati alta data sau contactati-ne telefonic!
                </StyledNoActivitiesMessageBox>);
        }

        // Show activities
        return (
            <ActivityStack direction='row'>
                {
                    // List all activities that have availability for date
                    activitiesToDisplay
                        .map((activity, i) => (
                            <Activity
                                key={i}
                                activity={activity}
                                handleOnActivityPress={handleOnActivityPress} />
                        ))
                }
            </ActivityStack>
        )
    }

    return (getStepBodyContent());
}

const ActivityStack = styled(Stack)(({ theme }) => ({
    width: '100%',
    flexFlow: 'column',
    padding: `0 ${theme.custom.global.paddingLeftRight}`,

    '&:after': {
        content: '""',
        width: '100%',
        height: '5px',
        backgroundColor: theme.palette.primary.main,
        margin: '15px 0'
    }
}));

const StyledNoActivitiesMessageBox = styled(Typography)(({ theme }) => ({
    fontSize: theme.custom.activity.textSize,
    color: theme.palette.primary.contrastText,
    padding: `0 ${theme.custom.global.paddingLeftRight}`,
    opacity: 0.75
}))