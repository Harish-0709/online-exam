pipeline {
    agent any

    stages {

        stage('Docker Test') {
            steps {
                sh 'docker --version'
                sh 'docker compose version'
                sh 'docker ps'
            }
        }
    }

    post {
        success {
            echo 'Docker connection is working!'
        }

        failure {
            echo 'Docker connection failed!'
        }
    }
}