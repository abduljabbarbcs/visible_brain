package com.visiblebrain.backend.exception;

/**
 * This class handles exceptions occurred in Wits-Orchestrator.
 * @author bilal.ahmad
 */
public class WitsException extends Exception {
    private static final long serialVersionUID = 1L;

    /**
     * Parameterized constructor which receive a string.
     * @param arg0
     */
    public WitsException(String arg0) {
        super(arg0);
    }

    /**
     * Parameterized constructor which receives throwable argument.
     * @param arg0
     */
    public WitsException(Throwable arg0) {
        super(arg0);
    }

    /**
     * Parameterized constructor having two parameters.
     * @param arg0
     * @param arg1
     */
    public WitsException(String arg0, Throwable arg1) {
        super(arg0, arg1);
        // TODO Auto-generated constructor stub
    }
}
