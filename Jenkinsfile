pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Verify Project') {
            steps {
                sh 'pwd'
                sh 'ls -la'
                sh 'ls -la backend'
                sh 'ls -la frontend'
            }
        }

        stage('Docker Check') {
            steps {
                sh 'docker --version'
                sh 'docker ps'
            }
        }
    }

    post {
        success {
            echo 'Jenkins and Docker are working successfully!'
        }

        failure {
            echo 'Pipeline failed!'
        }
    }
}