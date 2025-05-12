import React, { useState, useEffect } from 'react';
import { 
  fetchEmployees, 
  addEmployee, 
  updateEmployee, 
  deleteEmployee 
} from '../api/employeeApi';
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  TextField,
  Grid,
  Avatar,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Switch,
  IconButton,
  LinearProgress
} from '@mui/material';
import { 
  Delete, 
  Edit, 
  Add,
  Work,
  Phone,
  Email
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import styles from './EmployeeList.module.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({ 
    name: '', 
    position: '',
    phone: '',
    email: '',
    isActive: true
  });
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  // Загрузка сотрудников
  const loadEmployees = async () => {
    setLoading(true);
    try {
      const data = await fetchEmployees();
      setEmployees(data);
    } catch (error) {
      console.error("Ошибка загрузки:", error);
    } finally {
      setLoading(false);
    }
  };

  // Добавление сотрудника
  const handleAddEmployee = async () => {
    if (!newEmployee.name) return;
    
    setLoading(true);
    try {
      await addEmployee(newEmployee);
      setNewEmployee({ 
        name: '', 
        position: '',
        phone: '',
        email: '',
        isActive: true
      });
      await loadEmployees();
    } catch (error) {
      console.error("Ошибка добавления:", error);
    } finally {
      setLoading(false);
    }
  };

  // Обновление сотрудника
  const handleUpdateEmployee = async () => {
    if (!editingEmployee) return;
    
    setLoading(true);
    try {
      await updateEmployee(editingEmployee.id, editingEmployee);
      setOpenDialog(false);
      await loadEmployees();
    } catch (error) {
      console.error("Ошибка обновления:", error);
    } finally {
      setLoading(false);
    }
  };

  // Удаление сотрудника
  const handleDeleteEmployee = async (id) => {
    if (!window.confirm("Удалить сотрудника?")) return;
    
    setLoading(true);
    try {
      await deleteEmployee(id);
      await loadEmployees();
    } catch (error) {
      console.error("Ошибка удаления:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <div className={styles.container}>
      <Typography variant="h4" gutterBottom>
        Наши сотрудники
      </Typography>
      
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => {
          setEditingEmployee(null);
          setOpenDialog(true);
        }}
        className={styles.addButton}
      >
        Добавить сотрудника
      </Button>

      {loading && <LinearProgress sx={{ mb: 2 }} />}

      <Grid container spacing={3}>
        {employees.map((employee) => (
          <Grid item xs={12} sm={6} md={4} key={employee.id}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Card className={`${styles.card} ${!employee.isActive ? styles.inactive : ''}`}>
                <CardContent>
                  <div className={styles.cardHeader}>
                    <Avatar className={styles.avatar}>
                      {employee.name.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    <div>
                      <Typography variant="h6">{employee.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {employee.position || 'Должность не указана'}
                      </Typography>
                    </div>
                  </div>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <div className={styles.contactInfo}>
                    <div className={styles.contactItem}>
                      <Phone fontSize="small" />
                      <Typography variant="body2">
                        {employee.phone || 'Телефон не указан'}
                      </Typography>
                    </div>
                    <div className={styles.contactItem}>
                      <Email fontSize="small" />
                      <Typography variant="body2">
                        {employee.email || 'Email не указан'}
                      </Typography>
                    </div>
                  </div>
                  
                  <div className={styles.cardFooter}>
                    <Chip
                      label={employee.isActive ? 'Активен' : 'Неактивен'}
                      color={employee.isActive ? 'success' : 'error'}
                      size="small"
                    />
                    <div className={styles.actions}>
                      <IconButton
                        size="small"
                        onClick={() => {
                          setEditingEmployee(employee);
                          setOpenDialog(true);
                        }}
                      >
                        <Edit fontSize="small" color="primary" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteEmployee(employee.id)}
                      >
                        <Delete fontSize="small" color="error" />
                      </IconButton>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Dialog 
        fullWidth 
        maxWidth="sm" 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle>
          {editingEmployee ? 'Редактировать сотрудника' : 'Новый сотрудник'}
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            autoFocus
            margin="dense"
            label="ФИО"
            fullWidth
            value={editingEmployee?.name || newEmployee.name}
            onChange={(e) => editingEmployee 
              ? setEditingEmployee({...editingEmployee, name: e.target.value})
              : setNewEmployee({...newEmployee, name: e.target.value})
            }
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Должность"
            fullWidth
            value={editingEmployee?.position || newEmployee.position}
            onChange={(e) => editingEmployee
              ? setEditingEmployee({...editingEmployee, position: e.target.value})
              : setNewEmployee({...newEmployee, position: e.target.value})
            }
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Телефон"
            fullWidth
            value={editingEmployee?.phone || newEmployee.phone}
            onChange={(e) => editingEmployee
              ? setEditingEmployee({...editingEmployee, phone: e.target.value})
              : setNewEmployee({...newEmployee, phone: e.target.value})
            }
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            type="email"
            value={editingEmployee?.email || newEmployee.email}
            onChange={(e) => editingEmployee
              ? setEditingEmployee({...editingEmployee, email: e.target.value})
              : setNewEmployee({...newEmployee, email: e.target.value})
            }
            sx={{ mb: 2 }}
          />
          <div className={styles.switchContainer}>
            <Typography>Статус:</Typography>
            <Switch
              checked={editingEmployee?.isActive ?? newEmployee.isActive}
              onChange={(e) => editingEmployee
                ? setEditingEmployee({...editingEmployee, isActive: e.target.checked})
                : setNewEmployee({...newEmployee, isActive: e.target.checked})
              }
              color="primary"
            />
            <Typography>
              {editingEmployee?.isActive ?? newEmployee.isActive ? 'Активен' : 'Неактивен'}
            </Typography>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Отмена</Button>
          <Button 
            variant="contained" 
            onClick={editingEmployee ? handleUpdateEmployee : handleAddEmployee}
            disabled={loading}
          >
            {loading ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EmployeeList;