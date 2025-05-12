import React, { useState } from 'react';
import { 
  Container, 
  Tabs, 
  Tab, 
  Box, 
  CssBaseline, 
  ThemeProvider,
  createTheme
} from '@mui/material';
import FishList from './components/FishList';
import EmployeeList from './components/EmployeeList';
import TicketCalculator from './components/TicketCalculator';
import styles from './App.module.css';

// 1. Кастомная тема Material-UI
const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5', // Синий
    },
    secondary: {
      main: '#ff5722', // Оранжевый
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 300,
    },
  },
});

// 2. Компонент для вкладок
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }} className={styles.tabPanel}>
          {children}
        </Box>
      )}
    </div>
  );
}

// 3. Главный компонент App
function App() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={styles.appContainer}>
        <Container maxWidth="lg">
          {/* Заголовок */}
          <header className={styles.appHeader}>
            <h1 className={styles.appTitle}>
              <span className={styles.titleIcon}>🌊</span>
              Океанариум "Морские Глубины"
            </h1>
          </header>

          {/* Навигационные вкладки */}
          <Box sx={{ 
            bgcolor: 'background.paper',
            borderRadius: '12px 12px 0 0',
            boxShadow: 3,
            mb: -1,
            zIndex: 2,
            position: 'relative'
          }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              textColor="primary"
              indicatorColor="primary"
              aria-label="Навигационные вкладки"
            >
              <Tab label="Рыбы" id="tab-0" aria-controls="tabpanel-0" />
              <Tab label="Сотрудники" id="tab-1" aria-controls="tabpanel-1" />
              <Tab label="Билеты" id="tab-2" aria-controls="tabpanel-2" />
            </Tabs>
          </Box>

          {/* Контент вкладок */}
          <Box sx={{ 
            bgcolor: 'background.paper',
            borderRadius: '0 0 12px 12px',
            boxShadow: 3,
            p: 0,
            minHeight: '60vh'
          }}>
            <TabPanel value={tabValue} index={0}>
              <FishList />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <EmployeeList />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <TicketCalculator />
            </TabPanel>
          </Box>

          {/* Футер */}
          <footer className={styles.appFooter}>
            <p>© 2025 Океанариум. Все права защищены.</p>
          </footer>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;