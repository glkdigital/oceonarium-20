import React, { useState, useEffect } from 'react';
import { calculateTickets, fetchTicketHistory } from '../api/ticketApi';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
  LinearProgress
} from '@mui/material';
import { Add, History } from '@mui/icons-material';
import styles from './TicketCalculator.module.css';

const TicketCalculator = () => {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [total, setTotal] = useState(0);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const result = await calculateTickets(adults, children);
      setTotal(result.total);
      loadHistory();
    } catch (error) {
      console.error('Calculation error:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadHistory = async () => {
    try {
      const data = await fetchTicketHistory();
      setHistory(data);
    } catch (error) {
      console.error('History load error:', error);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <div className={styles.container}>
      <Typography variant="h4" gutterBottom>
        Калькулятор билетов
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} className={styles.calculatorPaper}>
            <Typography variant="h6" gutterBottom>
              Новый расчет
            </Typography>
            <TextField
              label="Взрослые"
              type="number"
              value={adults}
              onChange={(e) => setAdults(parseInt(e.target.value) || 0)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Дети"
              type="number"
              value={children}
              onChange={(e) => setChildren(parseInt(e.target.value) || 0)}
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleCalculate}
              disabled={loading}
              fullWidth
              size="large"
              sx={{ mt: 2 }}
            >
              Рассчитать
            </Button>
            
            {loading && <LinearProgress sx={{ mt: 2 }} />}
            
            {total > 0 && (
              <Typography variant="h5" sx={{ mt: 3, textAlign: 'center' }}>
                Итого: {total} руб.
              </Typography>
            )}
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper elevation={3} className={styles.historyPaper}>
            <Typography variant="h6" gutterBottom>
              <History sx={{ verticalAlign: 'middle', mr: 1 }} />
              История расчетов
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow className={styles.tableHeader}>
                    <TableCell>Дата</TableCell>
                    <TableCell align="right">Взрослые</TableCell>
                    <TableCell align="right">Дети</TableCell>
                    <TableCell align="right">Сумма</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {history.map((row) => (
                    <TableRow key={row.id} hover>
                      <TableCell>
                        {new Date(row.createdAt?.seconds * 1000).toLocaleDateString()}
                      </TableCell>
                      <TableCell align="right">{row.adults}</TableCell>
                      <TableCell align="right">{row.children}</TableCell>
                      <TableCell align="right">{row.total} руб.</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default TicketCalculator;