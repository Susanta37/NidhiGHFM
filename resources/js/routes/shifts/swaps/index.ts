import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\SuperAdmin\ShiftSwapController::loadForApproval
 * @see app/Http/Controllers/SuperAdmin/ShiftSwapController.php:37
 * @route '/super-admin/shifts/swaps/{swap}/approve'
 */
export const loadForApproval = (args: { swap: number | { id: number } } | [swap: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: loadForApproval.url(args, options),
    method: 'get',
})

loadForApproval.definition = {
    methods: ["get","head"],
    url: '/super-admin/shifts/swaps/{swap}/approve',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SuperAdmin\ShiftSwapController::loadForApproval
 * @see app/Http/Controllers/SuperAdmin/ShiftSwapController.php:37
 * @route '/super-admin/shifts/swaps/{swap}/approve'
 */
loadForApproval.url = (args: { swap: number | { id: number } } | [swap: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { swap: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { swap: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    swap: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        swap: typeof args.swap === 'object'
                ? args.swap.id
                : args.swap,
                }

    return loadForApproval.definition.url
            .replace('{swap}', parsedArgs.swap.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdmin\ShiftSwapController::loadForApproval
 * @see app/Http/Controllers/SuperAdmin/ShiftSwapController.php:37
 * @route '/super-admin/shifts/swaps/{swap}/approve'
 */
loadForApproval.get = (args: { swap: number | { id: number } } | [swap: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: loadForApproval.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SuperAdmin\ShiftSwapController::loadForApproval
 * @see app/Http/Controllers/SuperAdmin/ShiftSwapController.php:37
 * @route '/super-admin/shifts/swaps/{swap}/approve'
 */
loadForApproval.head = (args: { swap: number | { id: number } } | [swap: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: loadForApproval.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SuperAdmin\ShiftSwapController::loadForApproval
 * @see app/Http/Controllers/SuperAdmin/ShiftSwapController.php:37
 * @route '/super-admin/shifts/swaps/{swap}/approve'
 */
    const loadForApprovalForm = (args: { swap: number | { id: number } } | [swap: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: loadForApproval.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SuperAdmin\ShiftSwapController::loadForApproval
 * @see app/Http/Controllers/SuperAdmin/ShiftSwapController.php:37
 * @route '/super-admin/shifts/swaps/{swap}/approve'
 */
        loadForApprovalForm.get = (args: { swap: number | { id: number } } | [swap: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: loadForApproval.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SuperAdmin\ShiftSwapController::loadForApproval
 * @see app/Http/Controllers/SuperAdmin/ShiftSwapController.php:37
 * @route '/super-admin/shifts/swaps/{swap}/approve'
 */
        loadForApprovalForm.head = (args: { swap: number | { id: number } } | [swap: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: loadForApproval.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    loadForApproval.form = loadForApprovalForm
/**
* @see \App\Http\Controllers\SuperAdmin\ShiftSwapController::assign
 * @see app/Http/Controllers/SuperAdmin/ShiftSwapController.php:69
 * @route '/super-admin/shifts/swaps/{swap}/assign'
 */
export const assign = (args: { swap: number | { id: number } } | [swap: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assign.url(args, options),
    method: 'post',
})

assign.definition = {
    methods: ["post"],
    url: '/super-admin/shifts/swaps/{swap}/assign',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SuperAdmin\ShiftSwapController::assign
 * @see app/Http/Controllers/SuperAdmin/ShiftSwapController.php:69
 * @route '/super-admin/shifts/swaps/{swap}/assign'
 */
assign.url = (args: { swap: number | { id: number } } | [swap: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { swap: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { swap: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    swap: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        swap: typeof args.swap === 'object'
                ? args.swap.id
                : args.swap,
                }

    return assign.definition.url
            .replace('{swap}', parsedArgs.swap.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdmin\ShiftSwapController::assign
 * @see app/Http/Controllers/SuperAdmin/ShiftSwapController.php:69
 * @route '/super-admin/shifts/swaps/{swap}/assign'
 */
assign.post = (args: { swap: number | { id: number } } | [swap: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assign.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\SuperAdmin\ShiftSwapController::assign
 * @see app/Http/Controllers/SuperAdmin/ShiftSwapController.php:69
 * @route '/super-admin/shifts/swaps/{swap}/assign'
 */
    const assignForm = (args: { swap: number | { id: number } } | [swap: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: assign.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SuperAdmin\ShiftSwapController::assign
 * @see app/Http/Controllers/SuperAdmin/ShiftSwapController.php:69
 * @route '/super-admin/shifts/swaps/{swap}/assign'
 */
        assignForm.post = (args: { swap: number | { id: number } } | [swap: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: assign.url(args, options),
            method: 'post',
        })
    
    assign.form = assignForm
/**
* @see \App\Http\Controllers\SuperAdmin\ShiftSwapController::reject
 * @see app/Http/Controllers/SuperAdmin/ShiftSwapController.php:106
 * @route '/super-admin/shifts/swaps/{swap}/reject'
 */
export const reject = (args: { swap: number | { id: number } } | [swap: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

reject.definition = {
    methods: ["post"],
    url: '/super-admin/shifts/swaps/{swap}/reject',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SuperAdmin\ShiftSwapController::reject
 * @see app/Http/Controllers/SuperAdmin/ShiftSwapController.php:106
 * @route '/super-admin/shifts/swaps/{swap}/reject'
 */
reject.url = (args: { swap: number | { id: number } } | [swap: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { swap: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { swap: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    swap: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        swap: typeof args.swap === 'object'
                ? args.swap.id
                : args.swap,
                }

    return reject.definition.url
            .replace('{swap}', parsedArgs.swap.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdmin\ShiftSwapController::reject
 * @see app/Http/Controllers/SuperAdmin/ShiftSwapController.php:106
 * @route '/super-admin/shifts/swaps/{swap}/reject'
 */
reject.post = (args: { swap: number | { id: number } } | [swap: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\SuperAdmin\ShiftSwapController::reject
 * @see app/Http/Controllers/SuperAdmin/ShiftSwapController.php:106
 * @route '/super-admin/shifts/swaps/{swap}/reject'
 */
    const rejectForm = (args: { swap: number | { id: number } } | [swap: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reject.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SuperAdmin\ShiftSwapController::reject
 * @see app/Http/Controllers/SuperAdmin/ShiftSwapController.php:106
 * @route '/super-admin/shifts/swaps/{swap}/reject'
 */
        rejectForm.post = (args: { swap: number | { id: number } } | [swap: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reject.url(args, options),
            method: 'post',
        })
    
    reject.form = rejectForm
const swaps = {
    loadForApproval: Object.assign(loadForApproval, loadForApproval),
assign: Object.assign(assign, assign),
reject: Object.assign(reject, reject),
}

export default swaps