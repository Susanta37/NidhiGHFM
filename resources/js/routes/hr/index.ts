import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import attendanceC12b95 from './attendance'
import face from './face'
import users from './users'
import manualAttendance from './manual-attendance'
/**
* @see \App\Http\Controllers\HR\HRAttendanceController::attendance
 * @see app/Http/Controllers/HR/HRAttendanceController.php:0
 * @route '/hr/attendance'
 */
export const attendance = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: attendance.url(options),
    method: 'get',
})

attendance.definition = {
    methods: ["get","head"],
    url: '/hr/attendance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HR\HRAttendanceController::attendance
 * @see app/Http/Controllers/HR/HRAttendanceController.php:0
 * @route '/hr/attendance'
 */
attendance.url = (options?: RouteQueryOptions) => {
    return attendance.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HR\HRAttendanceController::attendance
 * @see app/Http/Controllers/HR/HRAttendanceController.php:0
 * @route '/hr/attendance'
 */
attendance.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: attendance.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HR\HRAttendanceController::attendance
 * @see app/Http/Controllers/HR/HRAttendanceController.php:0
 * @route '/hr/attendance'
 */
attendance.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: attendance.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HR\HRAttendanceController::attendance
 * @see app/Http/Controllers/HR/HRAttendanceController.php:0
 * @route '/hr/attendance'
 */
    const attendanceForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: attendance.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HR\HRAttendanceController::attendance
 * @see app/Http/Controllers/HR/HRAttendanceController.php:0
 * @route '/hr/attendance'
 */
        attendanceForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: attendance.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HR\HRAttendanceController::attendance
 * @see app/Http/Controllers/HR/HRAttendanceController.php:0
 * @route '/hr/attendance'
 */
        attendanceForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: attendance.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    attendance.form = attendanceForm
/**
* @see \App\Http\Controllers\HR\HREmployeeController::employees
 * @see app/Http/Controllers/HR/HREmployeeController.php:10
 * @route '/hr/employees'
 */
export const employees = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: employees.url(options),
    method: 'get',
})

employees.definition = {
    methods: ["get","head"],
    url: '/hr/employees',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HR\HREmployeeController::employees
 * @see app/Http/Controllers/HR/HREmployeeController.php:10
 * @route '/hr/employees'
 */
employees.url = (options?: RouteQueryOptions) => {
    return employees.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HR\HREmployeeController::employees
 * @see app/Http/Controllers/HR/HREmployeeController.php:10
 * @route '/hr/employees'
 */
employees.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: employees.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HR\HREmployeeController::employees
 * @see app/Http/Controllers/HR/HREmployeeController.php:10
 * @route '/hr/employees'
 */
employees.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: employees.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HR\HREmployeeController::employees
 * @see app/Http/Controllers/HR/HREmployeeController.php:10
 * @route '/hr/employees'
 */
    const employeesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: employees.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HR\HREmployeeController::employees
 * @see app/Http/Controllers/HR/HREmployeeController.php:10
 * @route '/hr/employees'
 */
        employeesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: employees.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HR\HREmployeeController::employees
 * @see app/Http/Controllers/HR/HREmployeeController.php:10
 * @route '/hr/employees'
 */
        employeesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: employees.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    employees.form = employeesForm
const hr = {
    attendance: Object.assign(attendance, attendanceC12b95),
employees: Object.assign(employees, employees),
face: Object.assign(face, face),
users: Object.assign(users, users),
manualAttendance: Object.assign(manualAttendance, manualAttendance),
}

export default hr