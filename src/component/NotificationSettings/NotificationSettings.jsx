/* eslint-disable no-undef */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import './NotificationSettings.css'
import NotificationSectionCard from './NotificationSectionCard'
import ToggleActionBtn from './toggleActionBtn'

function NotificationSettings() {

    const [settings, setSettings] = useState({
        pushNotification: {
            PauseAll: false
        },
        postStoriesComment: {
            LikesOnPost: false,
            CommentsOnPost: false,
            Mentions: false
        },
        subscribersTips: {
            NewSubscribers: false,
            NewTips: false,
        },
        followers: {
            NewFollowers: false,
        },
        messages: {
            NewMessages: false,
        },
        emailNotification: {
            NewEmail: false,
            PromotionEmail: false,
            SupportEmail: false,
        },
    })



    function changeFromSettings(toChange, finalValue, inAttr){
        setSettings(prev=>(
            {   ...prev,
                [inAttr]:{
                    ...prev[inAttr],
                    [toChange]: finalValue
                }
            }
        ))
        
    }

   
        

    




  return (
    <div className='NotificationSettingsPage'>
        <div className="topnav">
            <span className="back">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M9.20711 0.792893C8.81658 0.402369 8.18342 0.402369 7.79289 0.792893L5 3.58579L2.20711 0.792893C1.81658 0.402369 1.18342 0.402369 0.792894 0.792893C0.402369 1.18342 0.402369 1.81658 0.792894 2.20711L4.29289 5.70711C4.68342 6.09763 5.31658 6.09763 5.70711 5.70711L9.20711 2.20711C9.59763 1.81658 9.59763 1.18342 9.20711 0.792893Z" fill="#6C7275"/>
                </svg>
            </span>
        </div>

        <div className="NotificationSettingsCont">
            <ul className="NotificationSettings">
                <li>
                    <NotificationSectionCard sectionName="Push Notifications">
                        <div className="cardContent">
                            <b>Pause All
                                <span>Temporarily Pause Notifications</span>
                            </b>
                            <ToggleActionBtn
                                selected={settings.pushNotification.PauseAll}
                                changeFromSettings={changeFromSettings}
                                item="pushNotification"
                                child="PauseAll"
                                onClick={()=>{
                                    if(settingsChanged){
                                        setSettingsChanged(false)
                                    }else{
                                        setSettingsChanged(true)

                                    }
                                }}
                            />
                        </div>
                    </NotificationSectionCard>
                </li>
                <li>
                    <NotificationSectionCard sectionName="Post, stories & comments">
                        <div className="cardContent">
                            <b>Likes on your post</b>
                            <ToggleActionBtn
                                selected={settings.postStoriesComment.LikesOnPost}
                                changeFromSettings={changeFromSettings}
                                item="postStoriesComment"
                                child="LikesOnPost"
                                
                            />
                        </div>
                        <div className="cardContent">
                            <b>Comments on your post</b>
                            <ToggleActionBtn
                                selected={settings.postStoriesComment.CommentsOnPost}
                                changeFromSettings={changeFromSettings}
                                item="postStoriesComment"
                                child="CommentsOnPost"
                                
                            />
                        </div>
                        <div className="cardContent">
                            <b>Mentions</b>
                            <ToggleActionBtn
                                selected={settings.postStoriesComment.Mentions}
                                changeFromSettings={changeFromSettings}
                                item="postStoriesComment"
                                child="Mentions"
                                
                            />
                        </div>
                    </NotificationSectionCard>
                </li>
                <li>
                     <NotificationSectionCard sectionName="Subscribers & Tips">
                        <div className="cardContent">
                            <b>New Subscribers</b>
                            <ToggleActionBtn
                                selected={settings.subscribersTips.NewSubscribers}
                                changeFromSettings={changeFromSettings}
                                item="subscribersTips"
                                child="NewSubscribers"
                                
                            />
                        </div>
                        <div className="cardContent">
                            <b>New Tips</b>
                            <ToggleActionBtn
                                selected={settings.subscribersTips.NewTips}
                                changeFromSettings={changeFromSettings}
                                item="subscribersTips"
                                child="NewTips"
                                
                            />
                        </div>
                    </NotificationSectionCard>
                </li>
                <li>
                     <NotificationSectionCard sectionName="Followers">
                        <div className="cardContent">
                            <b>New Followers</b>
                            <ToggleActionBtn
                                selected={settings.followers.NewFollowers}
                                changeFromSettings={changeFromSettings}
                                item="followers"
                                child="NewFollowers"
                                
                            />
                        </div>
                    </NotificationSectionCard>
                </li>
                <li>
                     <NotificationSectionCard sectionName="Messages">
                        <div className="cardContent">
                            <b>Messages</b>
                            <ToggleActionBtn
                                selected={settings.messages.NewMessages}
                                changeFromSettings={changeFromSettings}
                                item="messages"
                                child="NewMessages"
                                
                            />
                        </div>
                    </NotificationSectionCard>
                </li>
                <li>
                    <NotificationSectionCard sectionName="Email Notifications">
                        <div className="cardContent">
                            <b>New Emails</b>
                            <ToggleActionBtn
                                selected={settings.emailNotification.NewEmail}
                                changeFromSettings={changeFromSettings}
                                item="emailNotification"
                                child="NewEmail"
                                
                            />
                        </div>
                        <div className="cardContent">
                            <b>Promotion Emails</b>
                            <ToggleActionBtn
                                selected={settings.emailNotification.PromotionEmail}
                                changeFromSettings={changeFromSettings}
                                item="emailNotification"
                                child="PromotionEmail"
                                
                            />
                        </div>
                        <div className="cardContent">
                            <b>Support Emails</b>
                            <ToggleActionBtn
                                selected={settings.emailNotification.SupportEmail}
                                changeFromSettings={changeFromSettings}
                                item="emailNotification"
                                child="SupportEmail"
                                
                            />
                        </div>
                    </NotificationSectionCard>
                </li>
                
            </ul>
        </div>
    </div>
  )
}

export default NotificationSettings