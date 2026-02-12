// Validation middleware for task creation
exports.validateTask = (req, res, next) => {
  const { title, dueDate } = req.body;
  const errors = [];

  // Title validation
  if (!title || title.trim() === '') {
    errors.push('Title is required');
  } else if (title.length > 100) {
    errors.push('Title cannot exceed 100 characters');
  }

  // Due date validation
  if (!dueDate) {
    errors.push('Due date is required');
  } else {
    const date = new Date(dueDate);
    if (isNaN(date.getTime())) {
      errors.push('Invalid date format');
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const inputDate = new Date(date);
      inputDate.setHours(0, 0, 0, 0);

      if (inputDate < today) {
        errors.push('Due date cannot be in the past');
      }
    }
  }

  // Priority validation (optional, has default)
  if (req.body.priority && !['Low', 'Medium', 'High'].includes(req.body.priority)) {
    errors.push('Priority must be Low, Medium, or High');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

// Validation middleware for task updates
exports.validateUpdate = (req, res, next) => {
  const errors = [];

  // Optional title validation
  if (req.body.title !== undefined) {
    if (req.body.title.trim() === '') {
      errors.push('Title cannot be empty');
    } else if (req.body.title.length > 100) {
      errors.push('Title cannot exceed 100 characters');
    }
  }

  // Optional due date validation
  if (req.body.dueDate !== undefined) {
    const date = new Date(req.body.dueDate);
    if (isNaN(date.getTime())) {
      errors.push('Invalid date format');
    }
  }

  // Optional priority validation
  if (req.body.priority !== undefined && !['Low', 'Medium', 'High'].includes(req.body.priority)) {
    errors.push('Priority must be Low, Medium, or High');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};
