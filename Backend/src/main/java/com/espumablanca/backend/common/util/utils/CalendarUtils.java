package com.espumablanca.backend.common.util.utils;

import java.util.Calendar;
import java.util.Objects;

public class CalendarUtils {
    public static Calendar getCalendarFrom(Long date) {
        if (Objects.isNull(date)) return null;
        Calendar now = Calendar.getInstance();
        now.setTimeInMillis(date);
        return now;
    }
}