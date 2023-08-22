import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginView from 'components/LoginView'
import ProfileView from 'components/ProfileView'
import PublicProfileView from './PublicProfileView'
import UserListView from './UserListView'

import Layout from 'components/Layout/Layout'
import ProtectedRoute from 'components/ProtectedRoute/ProtectedRoute'
import TeacherRoute from 'components/TeacherRoute/TeacherRoute'
import GearView from './GearView'
import GearInventory from 'components/Gear/GearInventory'
import GearStore from 'components/Gear/GearStore'

export default function App () {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route index path="/" element={<Navigate to="/login" />} />
          <Route path="/users/:userId" element={<PublicProfileView />} />
          <Route exact path="login" element={<LoginView />} />
          <Route
            exact
            path="profile"
            element={<ProtectedRoute Component={<ProfileView />} />}
          />
          <Route
            path="gear"
            element={<ProtectedRoute Component={<GearView />} />}
          >
            <Route path="inventory" element={<GearInventory />} />
            <Route path="store" element={<GearStore />} />
          </Route>
          <Route
            exact
            path="users"
            element={<TeacherRoute Component={<UserListView />} />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
