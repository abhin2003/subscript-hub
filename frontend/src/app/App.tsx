import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppShell } from './AppShell'
import { OverviewPage } from '../features/dashboard/OverviewPage'
import { SalesPage } from '../features/sales/SalesPage'
import { BillingPage } from '../features/billing/BillingPage'
import { CataloguePage } from '../features/catalogue/CataloguePage'
import { FinanceRulesPage } from '../features/finance-rules/FinanceRulesPage'
import { ReportsPage } from '../features/reports/ReportsPage'
import { AdminPage } from '../features/admin/AdminPage'
import { DocumentationPage } from '../features/docs/DocumentationPage'
import { SettingsPage } from '../features/settings/SettingsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/overview" element={<Navigate to="/" replace />} />
          <Route path="/sales" element={<SalesPage />} />
          <Route path="/billing" element={<BillingPage />} />
          <Route path="/catalogue" element={<CataloguePage />} />
          <Route path="/finance-rules" element={<FinanceRulesPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/documentation" element={<DocumentationPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
