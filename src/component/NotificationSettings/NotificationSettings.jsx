/* eslint-disable no-undef */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import './NotificationSettings.css'
import NotificationSectionCard from './NotificationSectionCard'
import ToggleActionBtn from './toggleActionBtn'
import BackTop from '../BackTop/BackTop'

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
        <BackTop/>

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