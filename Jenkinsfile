pipeline {
    agent {
        docker {
            image 'node' 
            args '-p 5000:5000' 
        }
    }
    stages {
        stage('install') { 
            steps {
                sh 'npm install yarn' 
                sh 'yarn'
                sh 'npm run build --prefix packages/common'
            }
        }

        stage('test'){
            steps{
                sh'npm run test'
            }
        }
    }
}