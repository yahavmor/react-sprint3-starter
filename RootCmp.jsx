const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from './cmps/AppHeader.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { About } from './pages/About.jsx'
import { Home } from './pages/Home.jsx'
import { MailIndex } from './apps/mail/pages/MailIndex.jsx'
import { MailDetails } from './apps/mail/pages/MailDetails.jsx'
import { NoteIndex } from './apps/note/pages/NoteIndex.jsx'
import { MailCompose } from './apps/mail/cmps/MailCompose.jsx'





export function RootCmp() {
    return <Router>
        <AppHeader/>
        <section className="root-cmp">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/mail" element={<MailIndex />}>
                    <Route path="compose" element={<MailCompose />} />
                </Route>
                <Route path="/mail/:mailId" element={<MailDetails />} />


                <Route path="/note" element={<NoteIndex />} />
            </Routes>

            <UserMsg />
        </section>
    </Router>
}
